defmodule ElixirNodeMssql.PageController do
  use ElixirNodeMssql.Web, :controller

  def index(conn, _params) do
    response = run_node_script(["tedious.js", "SELECT pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid"])
    |> handle_response

    render conn, "index.html"
  end

  def run_node_script(args) do
    System.cmd("node", args)
  end

  def handle_response(query_data) do
    case query_data do
      {data, 0} ->
        IO.inspect(data, label: "stop making fun of my typing")
        Poison.decode!(data)
        |> IO.inspect
      {error, 1} ->
        {:error, error}
    end
  end
end
