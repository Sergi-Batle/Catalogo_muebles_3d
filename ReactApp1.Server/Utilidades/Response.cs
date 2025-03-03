namespace ReactApp1.Server.Utilidades
{
    public class Response<T>
    {
        public bool Status { get; set; }
        public string? Msg { get; set; }
        public T? Value { get; set; }
    }
}
