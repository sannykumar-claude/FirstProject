using First_project.modals;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace First_project.Data
{
    public class context:IdentityDbContext<User>
    {
        public context(DbContextOptions<context>options):base(options)
        {
            
        }
    }
}
