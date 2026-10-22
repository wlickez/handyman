using System.ComponentModel.DataAnnotations;

namespace HandyMan.API.Models.Request
{
    public class CreateServiceRequest
    {
        [Required]
        [StringLength(255)]
        public string Description { get; set; } = string.Empty;

        [Range(1, int.MaxValue)]
        public int TaskCategoryId { get; set; }
    }
}
