defmodule ElixirNodeMssql.PageController do
  use ElixirNodeMssql.Web, :controller

  def index(conn, _params) do
    run_node_script(["tedious.js", "SELECT pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid"])
    |> IO.inspect(label: "=====> response")
    render conn, "index.html"
  end

  def run_node_script(args) do
    System.cmd("node", args)
  end

end
