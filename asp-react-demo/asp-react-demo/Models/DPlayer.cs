using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace asp_react_demo.Models
{
    public class DPlayer
    {
        [Key]
        public int playerID { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string forename { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string surname { get; set; }

        public int age { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string email { get; set; }

    }
}
