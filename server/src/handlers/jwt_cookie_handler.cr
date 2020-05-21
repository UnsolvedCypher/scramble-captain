# For simplicity, take JWT cookie from incoming requests (if it exists) and
# inject it as an Authorization header. This makes it easier to make requests
# without messing with headers on the client side

class JwtCookieHandler
  include HTTP::Handler

  def call(context)
    context.request.cookies["jwt"]?.try do |token|
      context.request.headers["Authorization"] = token.value
    end
    call_next(context)
  end
end
