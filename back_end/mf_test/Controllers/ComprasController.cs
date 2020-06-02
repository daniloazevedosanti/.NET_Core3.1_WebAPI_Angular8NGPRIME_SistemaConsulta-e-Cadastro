using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataInfrastructure.Data;
using Domain.Entities;
using System.IO;

namespace mf_test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComprasController : ControllerBase
    {
        private readonly Contexto _context;

        public ComprasController(Contexto context)
        {
            _context = context;
        }

        // GET: api/Compras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Compra>>> GetCompras()
        {
            return await _context.Compras.ToListAsync();
        }

        [HttpGet]
        [Route("compragadoid/{id}")]
        public ActionResult<Compra> GetCompragado(int id)
        {
            return _context.Compras
                .Where(x => x.IdCompra == id).FirstOrDefault();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Compra>> GetCompra(int id)
        {
            var compra = await _context.Compras.FindAsync(id);

            if (compra == null)
            {
                return NotFound();
            }

            return compra;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompra(int id, Compra compra)
        {
            if (id != compra.Id)
            {
                return BadRequest();
            }

            _context.Entry(compra).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompraExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        

        [HttpPost]
        public async Task<ActionResult<Compra>> PostCompra(Compra compra)
        {
            _context.Compras.Add(compra);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompra", new { id = compra.Id }, compra);
        }


        
        [HttpDelete("{id}")]
        public async Task<ActionResult<Compra>> DeleteCompra(int id)
        {
            var compra = await _context.Compras.FindAsync(id);
            if (compra == null)
            {
                return NotFound();
            }

            _context.Compras.Remove(compra);
            await _context.SaveChangesAsync();

            return compra;
        }


        [HttpGet]
        [Route("final/{id}")]
        public FileResult DownloadAsync(int id)
        {
            var compra =  _context.Compras.Find(id);

            /*if (compra == null)
            {
                return NotFound();
            }*/

            using (var doc = new PdfSharpCore.Pdf.PdfDocument())
            {
                var page = doc.AddPage();
                page.Size = PdfSharpCore.PageSize.A4;
                page.Orientation = PdfSharpCore.PageOrientation.Portrait;
                var graphics = PdfSharpCore.Drawing.XGraphics.FromPdfPage(page);
                var corFonte = PdfSharpCore.Drawing.XBrushes.Black;

                var textFormatter = new PdfSharpCore.Drawing.Layout.XTextFormatter(graphics);
                var fonteOrganzacao = new PdfSharpCore.Drawing.XFont("Arial", 10);
                var fonteDescricao = new PdfSharpCore.Drawing.XFont("Arial", 10, PdfSharpCore.Drawing.XFontStyle.BoldItalic);
                var titulodetalhes = new PdfSharpCore.Drawing.XFont("Arial", 12, PdfSharpCore.Drawing.XFontStyle.Bold);
                var fonteDetalhesDescricao = new PdfSharpCore.Drawing.XFont("Arial", 8);

                var tituloPrincipal = new PdfSharpCore.Drawing.Layout.XTextFormatter(graphics);
                tituloPrincipal.Alignment = PdfSharpCore.Drawing.Layout.XParagraphAlignment.Center;
                tituloPrincipal.DrawString("Relatório Compra de Gado | Id Compra: "+compra.IdCompra, titulodetalhes, corFonte, new PdfSharpCore.Drawing.XRect(0, 40, page.Width, page.Height));


                // Titulo Exibição
                
                textFormatter.DrawString("Pecuarista: ", fonteDescricao, corFonte, new PdfSharpCore.Drawing.XRect(20, 75, page.Width, page.Height));
                textFormatter.DrawString(compra.Comprador, fonteOrganzacao, corFonte, new PdfSharpCore.Drawing.XRect(80, 75, page.Width, page.Height));

                textFormatter.DrawString("Id Pecuarista: ", fonteDescricao, corFonte, new PdfSharpCore.Drawing.XRect(20, 95, page.Width, page.Height));
                textFormatter.DrawString(compra.CompradorId.ToString(), fonteOrganzacao, corFonte, new PdfSharpCore.Drawing.XRect(90, 95, page.Width, page.Height));
                           
                textFormatter.DrawString("Data de entrega: ", fonteDescricao, corFonte, new PdfSharpCore.Drawing.XRect(20, 115, page.Width, page.Height));
                textFormatter.DrawString(compra.DataEntrega.ToString(), fonteOrganzacao, corFonte, new PdfSharpCore.Drawing.XRect(100, 115, page.Width, page.Height));

                textFormatter.DrawString("Data da compra: ", fonteDescricao, corFonte, new PdfSharpCore.Drawing.XRect(20, 135, page.Width, page.Height));
                textFormatter.DrawString(compra.DataCompra.ToString(), fonteOrganzacao, corFonte, new PdfSharpCore.Drawing.XRect(100, 135, page.Width, page.Height));


                // Titulo maior 
                var tituloDetalhes = new PdfSharpCore.Drawing.Layout.XTextFormatter(graphics);
                tituloDetalhes.Alignment = PdfSharpCore.Drawing.Layout.XParagraphAlignment.Center;
                tituloDetalhes.DrawString("Detalhes/Itens da Compra ", titulodetalhes, corFonte, new PdfSharpCore.Drawing.XRect(0, 150, page.Width, page.Height));


                // titulo das colunas
                var alturaTituloDetalhesY = 170;
                var detalhes = new PdfSharpCore.Drawing.Layout.XTextFormatter(graphics);

                detalhes.DrawString("Animal", fonteDescricao, corFonte, new PdfSharpCore.Drawing.XRect(20, alturaTituloDetalhesY, page.Width, page.Height));

                detalhes.DrawString("Quantidade", fonteDescricao, corFonte, new PdfSharpCore.Drawing.XRect(144, alturaTituloDetalhesY, page.Width, page.Height));

                detalhes.DrawString("Preço", fonteDescricao, corFonte, new PdfSharpCore.Drawing.XRect(220, alturaTituloDetalhesY, page.Width, page.Height));

                detalhes.DrawString("Valor Total", fonteDescricao, corFonte, new PdfSharpCore.Drawing.XRect(290, alturaTituloDetalhesY, page.Width, page.Height));


                //dados do relatório 
                var alturaDetalhesItens = 190;
                var itens = _context.CompraGadoItems
                   .Include(x => x.Animal)
                   .Where(y => y.CompraGadoId == compra.IdCompra)
                   .ToList();
                var sum = 0.0;
                foreach (var item in itens)
                {

                    textFormatter.DrawString(item.Animal.Descricao.ToString(), fonteDetalhesDescricao, corFonte, new PdfSharpCore.Drawing.XRect(21, alturaDetalhesItens, page.Width, page.Height));
                    textFormatter.DrawString(item.Quantidade.ToString(), fonteDetalhesDescricao, corFonte, new PdfSharpCore.Drawing.XRect(145, alturaDetalhesItens, page.Width, page.Height));
                    textFormatter.DrawString("R$ "+double.Parse(item.Animal.Preco).ToString("C2"), fonteDetalhesDescricao, corFonte, new PdfSharpCore.Drawing.XRect(215, alturaDetalhesItens, page.Width, page.Height));
                    textFormatter.DrawString((int.Parse(item.Quantidade) *double.Parse(item.Animal.Preco)).ToString("C2"), fonteDetalhesDescricao, corFonte, new PdfSharpCore.Drawing.XRect(290, alturaDetalhesItens, page.Width, page.Height));

                    sum += int.Parse(item.Quantidade) * double.Parse(item.Animal.Preco);
                    alturaDetalhesItens += 20;
                }

                textFormatter.DrawString("Total: R$", fonteDescricao, corFonte, new PdfSharpCore.Drawing.XRect(145, alturaDetalhesItens, page.Width, page.Height));
                textFormatter.DrawString(sum.ToString("C2"), fonteOrganzacao, corFonte, new PdfSharpCore.Drawing.XRect(190, alturaDetalhesItens, page.Width, page.Height));
                using (MemoryStream stream = new MemoryStream())
                {
                    var contantType = "application/pdf";
                    doc.Save(stream, false);

                    var nomeArquivo = "Relatorio_idpecuarista_" + compra.CompradorId 
                    + "_" + compra.Comprador + "CompraId" + compra.IdCompra + ".pdf";

                    return File(stream.ToArray(), contantType, nomeArquivo);
                }
            }
        }
    

     private bool CompraExists(int id)
        {
            return _context.Compras.Any(e => e.Id == id);
        }
    }
}
