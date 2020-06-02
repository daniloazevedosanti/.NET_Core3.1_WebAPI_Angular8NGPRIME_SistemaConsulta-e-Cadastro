using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Domain.Entities
{
    public class Pecuarista
    {
        [Key]
        public Int32 Id { get; set; }
        public string Nome { get; set; }
        public virtual ICollection<CompraGado> CompraGados { get; set; }

    }

}
