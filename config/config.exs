# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :elixir_node_mssql,
  ecto_repos: [ElixirNodeMssql.Repo]

# Configures the endpoint
config :elixir_node_mssql, ElixirNodeMssql.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "T8/i/CRCS4tYqecbccspJ+WwOpnu6vcgxOnO1LQevT2p1gVMWzwJ8AOd2C3/bYUA",
  render_errors: [view: ElixirNodeMssql.ErrorView, accepts: ~w(html json)],
  pubsub: [name: ElixirNodeMssql.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
