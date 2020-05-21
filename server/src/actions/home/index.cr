class Home::Index < ApiAction
  include Api::Auth::SkipRequireAuthToken
  fallback do
    # Redirect the request to NextJS - this is probably better done with Nginx
    headers_to_send = request.headers.clone
    # We have to get rid of this because the gzip encoding messes everything up
    # This should be investigated further
    headers_to_send.delete("Accept-Encoding")
    res = HTTP::Client.get "http://localhost:3000#{request.path}", headers_to_send
    # In case of a redirect, include that header too
    res.headers["Location"]?.try do |location|
      response.headers["Location"] = location
    end
    Lucky::TextResponse.new(context, res.headers.fetch("Content-Type", ""), res.body, res.status_code)
  end
end
