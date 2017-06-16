defmodule ElixirNodeMssql.PageController do
  use ElixirNodeMssql.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def run_node_script(args) do
    System.cmd("node", args)
  end

end
