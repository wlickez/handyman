using System.ComponentModel.DataAnnotations;

namespace HandyMan.API.Models.Request
{
    public class CreateProviderRequest
    {
        [Required]
        [StringLength(255)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string PhoneNumber1 { get; set; } = string.Empty;

        [StringLength(50)]
        public string PhoneNumber2 { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string DocumentId { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Nit { get; set; } = "CF";

        [Required]
        [EmailAddress]
        [StringLength(150)]
        public string Email { get; set; } = string.Empty;
    }
}
