using System.ComponentModel.DataAnnotations;

namespace HandyMan.API.Models.Request
{
    public class CreateCategoryRequest
    {
        [Required]
        [StringLength(255)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [StringLength(300)]
        public string Icon { get; set; } = string.Empty;
    }
}
