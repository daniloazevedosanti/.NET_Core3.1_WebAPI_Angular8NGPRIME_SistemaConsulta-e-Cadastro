using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Domain.Entities
{
    public class Animal
    {
        [Key]
        public Int32 Id { get; set; }
        public string Descricao { get; set; }

        public string Preco { get; set; }
        public virtual ICollection<CompraGadoItem> CompraGadoItens { get; set; }

    }
}
