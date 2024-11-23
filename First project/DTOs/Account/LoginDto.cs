using System.ComponentModel.DataAnnotations;

namespace First_project.DTOs.Account
{
    public class LoginDto
    {
        [Required(ErrorMessage ="userName is required")] 
        public string UserName { get; set; }
        [Required] 
        public string Password { get;set; }
    }
}
