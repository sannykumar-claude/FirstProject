﻿using System.ComponentModel.DataAnnotations;

namespace First_project.DTOs.Account
{
    public class RegisterDto
    {
        [Required]
        [StringLength(15,MinimumLength = 3,ErrorMessage ="First name must be atleast {2},and maximum {1} characters")]
         public string FirstName { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "Last name must be atleast {2},and maximum {1} characters")]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 6, ErrorMessage = "Password must be atleast {2},and maximum {1} characters")]


        public string Password { get; set; }
    }
}
