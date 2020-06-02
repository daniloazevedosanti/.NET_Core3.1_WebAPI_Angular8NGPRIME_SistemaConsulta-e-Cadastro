using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using DataInfrastructure.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace mf_test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompraGadosController : ControllerBase
    {
        private readonly Contexto _context;
        private IConfiguration configuration;

        public CompraGadosController(Contexto context, IConfiguration configuration)
        {
            _context = context;
            this.configuration = configuration;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompraGado>>> GetCompraGados()
        {
            return await _context.CompraGados
                .AsNoTracking()
                .AsQueryable()
                .Include(x => x.Pecuarista)
                .Include(y => y.CompraGadoItem)
                .ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<CompraGado>> GetCompraGado(int id)
        {
            var compraGado = await _context.CompraGados.FindAsync(id);

            if (compraGado == null)
            {
                return NotFound();
            }

            return compraGado;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompraGado(int id, CompraGado compraGado)
        {
            if (id != compraGado.Id)
            {
                return BadRequest();
            }

            _context.Entry(compraGado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompraGadoExists(id))
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
        public async Task<ActionResult<CompraGado>> PostCompraGado(CompraGado compraGado)
        {
            _context.CompraGados.Add(compraGado);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompraGado", new { id = compraGado.Id },
                compraGado);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<CompraGado>> DeleteCompraGado(int id)
        {
            var compraGado = await _context.CompraGados.FindAsync(id);
            if (compraGado == null)
            {
                return NotFound();
            }

            _context.CompraGados.Remove(compraGado);
            await _context.SaveChangesAsync();

            return compraGado;
        }


        private bool CompraGadoExists(int id)
        {
            return _context.CompraGados.Any(e => e.Id == id);
        }


        [HttpGet]
        [Route("compras")]
        public IEnumerable<dynamic> ListCompraGados()
        {
            var strQuery = "select distinct DataEntrega, D.Nome, A.PecuaristaId, A.Id, "
                + "SUM(convert(int, B.Quantidade)*convert(int, C.Preco)) as Total "
                + "from CompraGados A inner join CompraGadoItems B "
                + "on B.CompraGadoId = A.Id inner join Animals C "
                + "on C.Id = B.AnimalId inner join Pecuaristas D "
                + " on D.Id = A.PecuaristaId "
                + "group by D.Nome, DataEntrega, A.Id, A.PecuaristaId";
            using (var conexaoBD = new SqlConnection(configuration.GetConnectionString("Connection")))
            {
                var result = conexaoBD.Query(strQuery);
                return result;
            }

        }


        public IEnumerable<dynamic> ListCompraGadoItens()
        {
            var strQuery = "select distinct DataEntrega, D.Nome, A.PecuaristaId, A.Id, "
                + "SUM(convert(int, B.Quantidade)*convert(int, C.Preco)) as Total "
                + "from CompraGados A inner join CompraGadoItems B "
                + "on B.CompraGadoId = A.Id inner join Animals C "
                + "on C.Id = B.AnimalId inner join Pecuaristas D "
                + " on D.Id = A.PecuaristaId "
                + "group by D.Nome, DataEntrega, A.Id, A.PecuaristaId";
            using (var conexaoBD = new SqlConnection(configuration.GetConnectionString("Connection")))
            {
                var result = conexaoBD.Query(strQuery);
                return result;
            }

        }

    }
}
