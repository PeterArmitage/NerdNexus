using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Middleware
{
    public class ValidationMiddleware
    {
        private readonly RequestDelegate _next;

        public ValidationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Continue with the request if the model state is valid
            if (!context.Request.Method.Equals("POST", StringComparison.OrdinalIgnoreCase) &&
                !context.Request.Method.Equals("PUT", StringComparison.OrdinalIgnoreCase))
            {
                await _next(context);
                return;
            }

            // For model binding errors, controller ModelState will handle the validation
            // This middleware adds a safety net for manual validation failures
            
            // Save the response body stream position
            var originalBodyStream = context.Response.Body;

            try
            {
                // Create a new memory stream to capture the response
                using var responseBody = new MemoryStream();
                context.Response.Body = responseBody;

                // Continue down the pipeline
                await _next(context);

                // Read the response body
                responseBody.Seek(0, SeekOrigin.Begin);
                var response = await new StreamReader(responseBody).ReadToEndAsync();

                // If response status code is 400 (Bad Request), check if it's a validation error
                if (context.Response.StatusCode == (int)HttpStatusCode.BadRequest)
                {
                    try
                    {
                        // Try to deserialize the response to check if it's a validation problem
                        var validationProblem = JsonSerializer.Deserialize<ValidationProblemDetails>(response);
                        
                        // If it's a validation problem, format it nicer for the client
                        if (validationProblem?.Errors?.Count > 0)
                        {
                            responseBody.Seek(0, SeekOrigin.Begin);
                            responseBody.SetLength(0);
                            
                            var formattedResponse = new
                            {
                                status = "error",
                                message = "Validation failed",
                                errors = validationProblem.Errors
                            };
                            
                            // Write the formatted response
                            await JsonSerializer.SerializeAsync(responseBody, formattedResponse);
                        }
                    }
                    catch
                    {
                        // If deserialization fails, it wasn't a validation problem, so just continue
                    }
                }

                // Copy the modified response to the original response body stream
                responseBody.Seek(0, SeekOrigin.Begin);
                await responseBody.CopyToAsync(originalBodyStream);
            }
            finally
            {
                // Restore the original response body stream
                context.Response.Body = originalBodyStream;
            }
        }
    }

    // Extension method to add the validation middleware to the app
    public static class ValidationMiddlewareExtensions
    {
        public static IApplicationBuilder UseValidationMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ValidationMiddleware>();
        }
    }
} 