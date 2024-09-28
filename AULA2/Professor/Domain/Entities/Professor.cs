namespace Domain.Entities
{
    public class Professor
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string CNPJ { get; set; }

        public List<Agendamento> Agendamentos { get; set; } = new List<Agendamento>();
    }  
}