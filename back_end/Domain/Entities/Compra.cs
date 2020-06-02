using System;

namespace Domain.Entities
{
    public class Compra
    {
        public Int32 Id { get; set; }
        public String Comprador { get; set; }
        public Int32 CompradorId { get; set; }
        public Int32 IdCompra { get; set; }
        public DateTime DataEntrega { get; set; }
        public DateTime DataCompra { get; set; }

    }
}
