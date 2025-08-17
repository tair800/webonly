using Microsoft.EntityFrameworkCore;
using WebOnlyAPI.Data;
using WebOnlyAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:3000")
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials();
        });
});

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IEquipmentService, EquipmentService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<IReferenceService, ReferenceService>();
builder.Services.AddScoped<DataSeederService>();
builder.Services.AddScoped<IVisitorAnalyticsService, VisitorAnalyticsService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "WebOnlyAPI v1");
        options.RoutePrefix = ""; // This will serve Swagger UI at the root
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseStaticFiles();

app.MapControllers();

// Seed data - temporarily disabled for testing
// using (var scope = app.Services.CreateScope())
// {
//     var dataSeeder = scope.ServiceProvider.GetRequiredService<DataSeederService>();
//     await dataSeeder.SeedAllDataAsync();
// }

await app.RunAsync();
