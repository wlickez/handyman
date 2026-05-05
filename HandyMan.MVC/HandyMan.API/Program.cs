using HandyMan.API.Interfaces;
using HandyMan.API.Models;
using HandyMan.API.Models.Helpers;
using HandyMan.API.Services;

namespace HandyMan.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

            builder.Services.AddScoped(typeof(IDBService<>), typeof(DBService<>));

            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                        
                });
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("CorsPolicy");

            app.MapControllers();
            app.Run();
        }
    }
}
