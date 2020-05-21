# Include modules and add methods that are for all API requests
abstract class ApiAction < Lucky::Action
  accepted_formats [:json, :html, :event_stream], default: :json

  include Api::Auth::Helpers
  include Api::Auth::RequireAuthToken
end
