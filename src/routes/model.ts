import Router from "@koa/router";
import { DefaultContext, DefaultState, Next, ParameterizedContext } from "koa";

export type RouteHandler = (
  ctx: ParameterizedContext<
    DefaultState,
    DefaultContext & Router.RouterParamContext<DefaultState, DefaultContext>,
    unknown
  >,
  next: Next
) => Promise<unknown>;
