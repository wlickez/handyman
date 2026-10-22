using System.ComponentModel.DataAnnotations;

namespace HandyMan.API.Models.Request
{
    public class SignupRequest
    {
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string PhoneNumber1 { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string DocumentId { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [StringLength(150)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(100, MinimumLength = 8)]
        public string Password { get; set; } = string.Empty;
    }
}
