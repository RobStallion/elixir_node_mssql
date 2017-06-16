defmodule ElixirNodeMssql.PageController do
  use ElixirNodeMssql.Web, :controller

  def index(conn, _params) do
    response = run_node_script(["tedious.js", "SELECT pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid"])

    case response do
      {data, 0} ->
        {:ok, data}
      {error, 1} ->
        {:error, error}
    end

    render conn, "index.html"
  end

  def run_node_script(args) do
    System.cmd("node", args)
  end

end
