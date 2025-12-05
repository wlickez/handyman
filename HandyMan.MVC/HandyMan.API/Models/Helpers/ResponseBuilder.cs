namespace HandyMan.API.Models.Helpers
{

    public class ResponseBuilder<T>
    {
        private bool _isSuccess;
        private string _message;        
        private List<T> _result;
        
        public ResponseBuilder<T> SetSuccess(bool isSuccess)
        {
            _isSuccess = isSuccess;
            return this;
        }

        public ResponseBuilder<T> SetMessage(string message)
        {
            _message = message;
            return this;
        }

        public ResponseBuilder<T> SetResult(List<T> result)
        {
            _result = result;
            return this;
        }

        public Response<T> Build()
        {
            return new Response<T>(_isSuccess, _message, _result);
        }
    }

}
