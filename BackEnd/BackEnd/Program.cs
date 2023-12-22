using AquaCars.DTOs.CategoryDTOs;
using AquaCars.DTOs.IdentityDTOs;
using AquaCars.DTOs.ReservationDTOs;
using AquaCars.DTOs.SubCategoryDTOs;
using AquaCars.DTOs.VechileDTOs;
using AquaCars.Persistence;
using AquaCars.Repositories;
using AquaCars.Repositories.Interfaces;
using AquaCars.Services;
using AquaCars.Services.Interfaces;
using AquaCars.Utility;
using AquaCars.Utility.Interfaces;
using AquaCars.Validations.CategoryValidations;
using AquaCars.Validations.IdentityValidations;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SportsManagementSystem.Application.Utility.Options;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Aqua Cars API", Version = "v1" });
    options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = JwtBearerDefaults.AuthenticationScheme
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = JwtBearerDefaults.AuthenticationScheme
                },
                Scheme = "Oauth2",
                Name = JwtBearerDefaults.AuthenticationScheme,
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddScoped<ISubCategoryRepository, SubCategoryRepository>();
builder.Services.AddScoped<ISubCategoryService, SubCategoryService>();

builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
builder.Services.AddScoped<IVehicleService, VehicleService>();

builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
builder.Services.AddScoped<IReservationService, ReservationService>();

builder.Services.AddScoped<IIdentityRepository, IdentityRepository>();
builder.Services.AddScoped<IIdentityService, IdentityService>();

builder.Services.AddScoped<IPhotoSaver, PhotoSaver>();
builder.Services.AddScoped<ITokenGenerator, TokenGenerator>();
builder.Services.AddScoped<IEmailSender, EmailSender>();

builder.Services.AddScoped<SignInManager<IdentityUser>>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddTransient<IValidator<AddCategoryDTO>, AddCategoryDTOValidator>();
builder.Services.AddTransient<IValidator<EditCategoryDTO>, EditCategoryDTOValidator>();
builder.Services.AddTransient<IValidator<AddSubCategoryDTO>, AddSubCategoryDTOValidator>();
builder.Services.AddTransient<IValidator<EditSubCategoryDTO>, EditSubCategoryDTOValidator>();
builder.Services.AddTransient<IValidator<AddVehicleDTO>, AddVehicleDTOValidator>();
builder.Services.AddTransient<IValidator<EditVehicleDTO>, EditVehicleDTOValidator>();
builder.Services.AddTransient<IValidator<AddReservationDTO>, AddReservationDTOValidator>();
builder.Services.AddTransient<IValidator<EditReservationDTO>, EditReservationDTOValidator>();
builder.Services.AddTransient<IValidator<RegisterDTO>, RegisterDTOValidator>();
builder.Services.AddTransient<IValidator<LoginDTO>, LoginDTOValidator>();
builder.Services.AddTransient<IValidator<ResetPasswordDTO>, ResetPasswordDTOValidator>();

builder.Services.AddIdentityCore<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>("AquaCars")
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<EmailOptions>(
builder.Configuration.GetSection(EmailOptions.EmailSender));


builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
