using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class CompraGadoItem
    {
        [Key]
        public Int32 Id { get; set; }
        public string Quantidade { get; set; }
        public Int32 CompraGadoId { get; set; }
        public Int32 AnimalId { get; set; }
        public CompraGado CompraGado { get; set; }
        public Animal Animal { get; set; }

    }
}
