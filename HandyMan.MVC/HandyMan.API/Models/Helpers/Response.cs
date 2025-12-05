namespace HandyMan.API.Models.Helpers
{
    public class Response<T>
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public List<T> Result { get; set; }
        public int AmountItems { get; set; }                
       
        public Response(bool isSuccess, string message, List<T> result)
        {
            IsSuccess = isSuccess;
            Message = string.Concat(isSuccess ? "Solicitud ejecutada con éxito. " : "Ha ocurrido un error. ", message);
            Result = result;
            AmountItems = result == null ? 0 : result.Count;
        }
    }
}
