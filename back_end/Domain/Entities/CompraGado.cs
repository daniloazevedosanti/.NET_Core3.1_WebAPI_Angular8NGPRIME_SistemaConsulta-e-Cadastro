using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Domain.Entities
{
    public class CompraGado
    {
        [Key]
        public Int32 Id { get; set; }
        public DateTime DataEntrega { get; set; }
        public Int32 PecuaristaId { get; set; }
        public virtual Pecuarista Pecuarista { get; set; }
        public virtual ICollection<CompraGadoItem> CompraGadoItem { get; set; }
    }
}
