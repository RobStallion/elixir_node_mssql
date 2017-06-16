defmodule ElixirNodeMssql.PageController do
  use ElixirNodeMssql.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
