using HandyMan.API.Interfaces;
using HandyMan.API.Models;
using HandyMan.API.Models.Helpers;
using HandyMan.API.Models.Request;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.NetworkInformation;
using System.Security.Claims;
using System.Text;

namespace HandyMan.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        IConfiguration _configuration;
        IDBService<HandymanUser> _dBService;
        Response<string> _response;
        private readonly PasswordHasher<HandymanUser> _passwordHasher = new();

        public LoginController(IConfiguration configuration, IDBService<HandymanUser> dBService)
        {
            _configuration = configuration;
            _dBService = dBService;
           
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest user)
        {
            try
            {
                string sql = "select Email, Password " +
                    "from [HANDYMAN.USER] u " +
                    "where u.Email = @email";

                List<ParametroSql> parametros = new List<ParametroSql>
                {
                    new ParametroSql("@email", user.Email)
                };
                var userExist = (await _dBService.SelectEntity(sql, false, parametros, null)).FirstOrDefault();

                _response = new ResponseBuilder<string>().SetSuccess(false)
                            .SetMessage("Something wrong happend. ")
                            .SetResult([""])
                            .Build();

                if (userExist == null || !VerifyPassword(userExist.Password, user.Password))
                    return NotFound(_response);

                if (!IsPasswordHash(userExist.Password))
                {
                    string hashedPassword = _passwordHasher.HashPassword(new HandymanUser { Email = user.Email }, user.Password);
                    string updateResult = await _dBService.UpdateEntity(
                        "update [HANDYMAN.USER] set Password = @password where Email = @email",
                        false,
                        [
                            new ParametroSql("@password", hashedPassword),
                            new ParametroSql("@email", user.Email)
                        ],
                        null);
                    if (!string.IsNullOrEmpty(updateResult))
                        throw new Exception($"No se pudo actualizar la contraseña. {updateResult}");
                }

                string jwtToken = GenerarToken(userExist.Email);
                _response = new ResponseBuilder<string>()
                            .SetMessage("Login successful. ")
                            .SetResult([jwtToken])
                            .SetSuccess(true)
                            .Build() ;
                            
                return Ok(_response);
            }
            catch (Exception ex)
            {
                return StatusCode(503, new ResponseBuilder<HandymanStatus>().SetMessage(ex.Message).Build());
            }
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest user)
        {
            try
            {
                var existingUser = (await _dBService.SelectEntity(
                    "select Id from [HANDYMAN.USER] where Email = @email",
                    false,
                    [new ParametroSql("@email", user.Email)],
                    null)).FirstOrDefault();

                if (existingUser != null)
                {
                    return Conflict(new ResponseBuilder<string>()
                        .SetSuccess(false)
                        .SetMessage("Ya existe una cuenta con ese correo electrónico.")
                        .SetResult([""])
                        .Build());
                }

                string hashedPassword = _passwordHasher.HashPassword(
                    new HandymanUser { Email = user.Email },
                    user.Password);

                string result = await _dBService.InsertEntity(
                    "insert into [HANDYMAN.USER] " +
                    "(FirstName, LastName, PhoneNumber1, DocumentId, Email, Password, StatusId) " +
                    "values (@firstName, @lastName, @phoneNumber1, @documentId, @email, @password, 4)",
                    false,
                    [
                        new ParametroSql("@firstName", user.FirstName),
                        new ParametroSql("@lastName", user.LastName),
                        new ParametroSql("@phoneNumber1", user.PhoneNumber1),
                        new ParametroSql("@documentId", user.DocumentId),
                        new ParametroSql("@email", user.Email),
                        new ParametroSql("@password", hashedPassword)
                    ],
                    null);

                if (!string.IsNullOrEmpty(result))
                    throw new Exception($"No se logró crear la cuenta. {result}");

                return Ok(new ResponseBuilder<string>()
                    .SetSuccess(true)
                    .SetMessage("Cuenta creada correctamente.")
                    .SetResult([""])
                    .Build());
            }
            catch (Exception ex)
            {
                return StatusCode(503, new ResponseBuilder<string>()
                    .SetSuccess(false)
                    .SetMessage(ex.Message)
                    .SetResult([""])
                    .Build());
            }
        }

        private bool VerifyPassword(string storedPassword, string submittedPassword)
        {
            if (!IsPasswordHash(storedPassword))
                return storedPassword == submittedPassword;

            return _passwordHasher.VerifyHashedPassword(
                new HandymanUser(),
                storedPassword,
                submittedPassword) != PasswordVerificationResult.Failed;
        }

        private static bool IsPasswordHash(string password)
        {
            return password.StartsWith("AQAAAA", StringComparison.Ordinal);
        }

        private string GenerarToken(string usuario)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, usuario)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(_configuration.GetValue<double>("Jwt:DurationInHours")),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        }
}
