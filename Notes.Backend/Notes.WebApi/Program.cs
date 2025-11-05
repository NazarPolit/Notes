
using Microsoft.AspNetCore.Identity;
using Notes.Application.Common.Mappings;
using Notes.Application.Interfaces;
using Notes.Persistance;
using System.Reflection;
using Notes.Application;
using Notes.WebApi.Middleware;

namespace Notes.WebApi
{
	public class Program
	{

        public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.

			builder.Services.AddControllers();


			builder.Services.AddAutoMapper(config =>
			{
				config.AddProfile(new AssemblyMappingProfile(Assembly.GetExecutingAssembly()));
				config.AddProfile(new AssemblyMappingProfile(typeof(INotesDbContext).Assembly));
			});

			builder.Services.AddApplication();
			builder.Services.AddPersistance(builder.Configuration);

			builder.Services.AddCors(options =>
			{
				options.AddPolicy("AllowAll", policy =>
				{
					policy.AllowAnyHeader();
					policy.AllowAnyMethod();
					policy.AllowAnyOrigin();
				});
			});
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();



			var app = builder.Build();

			var scopedFactory = app.Services.GetService<IServiceScopeFactory>();
			using (var scope = scopedFactory.CreateScope())
			{
				var serviceProvider = scope.ServiceProvider;
				try
				{
					var context = serviceProvider.GetRequiredService<NotesDbContext>();
					DbInitializer.Initialize(context);
				}
				catch (Exception ex)
				{

				}
			}
			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseCustomExceptionHandler();

			app.UseHttpsRedirection();
			app.UseCors("AllowAll");

			app.UseAuthorization();


			app.MapControllers();

			app.Run();
		}
	}
}
