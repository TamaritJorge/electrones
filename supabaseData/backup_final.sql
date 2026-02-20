--
-- PostgreSQL database dump
--

\restrict RN4hZKlfwQz4nRAkMX3JN8uhkT7qG1sepqU2n3hPLveOSHQQU9nV1fmd79VKkJX

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.8 (Ubuntu 17.8-1.pgdg22.04+1)

-- Started on 2026-02-19 13:21:33 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 38 (class 2615 OID 16494)
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- TOC entry 7 (class 3079 OID 45348)
-- Name: pg_cron; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;


--
-- TOC entry 4449 (class 0 OID 0)
-- Dependencies: 7
-- Name: EXTENSION pg_cron; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_cron IS 'Job scheduler for PostgreSQL';


--
-- TOC entry 24 (class 2615 OID 16388)
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- TOC entry 36 (class 2615 OID 16574)
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- TOC entry 35 (class 2615 OID 16563)
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- TOC entry 13 (class 2615 OID 16386)
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- TOC entry 14 (class 2615 OID 16555)
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- TOC entry 39 (class 2615 OID 16542)
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- TOC entry 33 (class 2615 OID 16603)
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- TOC entry 6 (class 3079 OID 16639)
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- TOC entry 4456 (class 0 OID 0)
-- Dependencies: 6
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- TOC entry 2 (class 3079 OID 16389)
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- TOC entry 4457 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- TOC entry 4 (class 3079 OID 16443)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- TOC entry 4458 (class 0 OID 0)
-- Dependencies: 4
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 5 (class 3079 OID 16604)
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- TOC entry 4459 (class 0 OID 0)
-- Dependencies: 5
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- TOC entry 3 (class 3079 OID 16432)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- TOC entry 4460 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 1217 (class 1247 OID 16738)
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- TOC entry 1241 (class 1247 OID 16879)
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- TOC entry 1214 (class 1247 OID 16732)
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- TOC entry 1211 (class 1247 OID 16727)
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1259 (class 1247 OID 16982)
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


ALTER TYPE auth.oauth_authorization_status OWNER TO supabase_auth_admin;

--
-- TOC entry 1271 (class 1247 OID 17055)
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


ALTER TYPE auth.oauth_client_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1253 (class 1247 OID 16960)
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1262 (class 1247 OID 16992)
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


ALTER TYPE auth.oauth_response_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1247 (class 1247 OID 16921)
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1364 (class 1247 OID 41963)
-- Name: achievement_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.achievement_category AS ENUM (
    'constancia',
    'exploracion',
    'cooperacion',
    'especial'
);


ALTER TYPE public.achievement_category OWNER TO postgres;

--
-- TOC entry 1316 (class 1247 OID 17350)
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- TOC entry 1307 (class 1247 OID 17310)
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- TOC entry 1310 (class 1247 OID 17325)
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- TOC entry 1322 (class 1247 OID 17392)
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- TOC entry 1319 (class 1247 OID 17363)
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- TOC entry 1295 (class 1247 OID 17241)
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS',
    'VECTOR'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- TOC entry 468 (class 1255 OID 16540)
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- TOC entry 4461 (class 0 OID 0)
-- Dependencies: 468
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- TOC entry 549 (class 1255 OID 16709)
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- TOC entry 423 (class 1255 OID 16539)
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- TOC entry 4464 (class 0 OID 0)
-- Dependencies: 423
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- TOC entry 439 (class 1255 OID 16538)
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- TOC entry 4466 (class 0 OID 0)
-- Dependencies: 439
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- TOC entry 460 (class 1255 OID 16547)
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- TOC entry 4489 (class 0 OID 0)
-- Dependencies: 460
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- TOC entry 538 (class 1255 OID 16568)
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- TOC entry 4491 (class 0 OID 0)
-- Dependencies: 538
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- TOC entry 413 (class 1255 OID 16549)
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- TOC entry 4493 (class 0 OID 0)
-- Dependencies: 413
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- TOC entry 558 (class 1255 OID 16559)
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- TOC entry 551 (class 1255 OID 16560)
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- TOC entry 533 (class 1255 OID 16570)
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- TOC entry 4522 (class 0 OID 0)
-- Dependencies: 533
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- TOC entry 470 (class 1255 OID 16387)
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $_$
  BEGIN
      RAISE DEBUG 'PgBouncer auth request: %', p_usename;

      RETURN QUERY
      SELECT
          rolname::text,
          CASE WHEN rolvaliduntil < now()
              THEN null
              ELSE rolpassword::text
          END
      FROM pg_authid
      WHERE rolname=$1 and rolcanlogin;
  END;
  $_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- TOC entry 528 (class 1255 OID 37048)
-- Name: assign_user_team(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.assign_user_team() RETURNS text
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
declare
  current_team text;
  selected_team text;
begin
  -- 1. Si ya tiene equipo, no hacemos nada
  select team into current_team
  from profiles
  where id = auth.uid();

  if current_team is not null then
    return current_team;
  end if;

  -- 2. ALGORITMO DE EQUILIBRIO DINÁMICO
  with team_stats as (
    select
      t.id as team_id,
      count(p.id) as member_count
    from
      teams t
    left join
      profiles p on p.team = t.id 
      and p.role is distinct from 'admin' -- Ignoramos admins para el equilibrio
    group by
      t.id
  )
  select team_id into selected_team
  from team_stats
  order by
    member_count asc, -- Llenar primero los vacíos
    random()          -- Desempate aleatorio
  limit 1;

  -- 3. Asignar
  update profiles
  set team = selected_team
  where id = auth.uid();

  return selected_team;
end;
$$;


ALTER FUNCTION public.assign_user_team() OWNER TO postgres;

--
-- TOC entry 490 (class 1255 OID 45347)
-- Name: award_monthly_achievements(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.award_monthly_achievements() RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  v_top1_achv_id uuid;
  v_top10_achv_id uuid;
  v_team_achv_id uuid;
  v_top_team_id uuid; 
BEGIN
  -- 1. Identificar los UUIDs de los 3 logros buscando por su icon_name
  SELECT id INTO v_top1_achv_id FROM achievements WHERE icon_name = 'achv_rank_top1' LIMIT 1;
  SELECT id INTO v_top10_achv_id FROM achievements WHERE icon_name = 'achv_rank_legend' LIMIT 1;
  SELECT id INTO v_team_achv_id FROM achievements WHERE icon_name = 'achv_team_top1' LIMIT 1;

  -- Si no existen los logros, salimos para no causar errores
  IF v_top1_achv_id IS NULL OR v_top10_achv_id IS NULL OR v_team_achv_id IS NULL THEN
    RAISE NOTICE 'No se encontraron los logros. Verifica los icon_name.';
    RETURN;
  END IF;

  -- 2. Otorgar 'Electrón Legendario' (Top 10 individual)
  -- Usamos la misma lógica de ordenación que en tu get_global_leaderboard
  INSERT INTO user_achievements (user_id, achievement_id)
  SELECT id, v_top10_achv_id
  FROM profiles
  WHERE role IS DISTINCT FROM 'admin'
  ORDER BY COALESCE(lifetime_score, 0)::bigint DESC
  LIMIT 10
  ON CONFLICT (user_id, achievement_id) DO NOTHING; 
  -- El ON CONFLICT evita errores si un usuario gana el top 10 dos meses seguidos y ya tiene el logro

  -- 3. Otorgar 'Superconductor' (Top 1 individual)
  INSERT INTO user_achievements (user_id, achievement_id)
  SELECT id, v_top1_achv_id
  FROM profiles
  WHERE role IS DISTINCT FROM 'admin'
  ORDER BY COALESCE(lifetime_score, 0)::bigint DESC
  LIMIT 1
  ON CONFLICT (user_id, achievement_id) DO NOTHING;

  -- 4. Otorgar 'Red Maestra' (Equipo Top 1)
  -- Primero descubrimos qué equipo tiene la suma más alta (misma lógica que get_team_leaderboard)
  SELECT t.id INTO v_top_team_id
  FROM teams t
  LEFT JOIN profiles p ON p.team = t.id 
    AND p.role IS DISTINCT FROM 'admin' 
  GROUP BY t.id
  ORDER BY COALESCE(SUM(p.lifetime_score), 0) DESC
  LIMIT 1;

  -- Si hay un equipo ganador, le damos el logro a todos sus miembros
  IF v_top_team_id IS NOT NULL THEN
    INSERT INTO user_achievements (user_id, achievement_id)
    SELECT id, v_team_achv_id
    FROM profiles
    WHERE team = v_top_team_id AND role IS DISTINCT FROM 'admin'
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;
  
END;
$$;


ALTER FUNCTION public.award_monthly_achievements() OWNER TO postgres;

--
-- TOC entry 471 (class 1255 OID 32254)
-- Name: buy_item(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.buy_item(p_product_id uuid) RETURNS json
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
declare
  v_user_id uuid;
  v_product_price int;
  v_product_name text;
  v_product_stock int;
  v_max_per_user int;     -- Nuevo campo
  v_current_owned int;    -- Para contar inventario
  v_user_balance int;
begin
  -- 1. Obtener ID del usuario
  v_user_id := auth.uid();

  -- 2. Obtener datos del producto (incluyendo max_per_user)
  select price, name, stock, max_per_user
  into v_product_price, v_product_name, v_product_stock, v_max_per_user
  from shop_products
  where id = p_product_id and is_active = true;

  -- Chequeo A: ¿Existe?
  if not found then
    return json_build_object('success', false, 'message', 'Producto no disponible');
  end if;

  -- Chequeo B: ¿Hay Stock Global? (Si es NULL es infinito)
  if v_product_stock is not null and v_product_stock <= 0 then
    return json_build_object('success', false, 'message', 'Producto agotado');
  end if;

  -- Chequeo C: ¿Límite por usuario? (NUEVO)
  -- Solo comprobamos si max_per_user tiene un número (no es NULL)
  if v_max_per_user is not null then
    select count(*) into v_current_owned
    from user_inventory
    where user_id = v_user_id and product_id = p_product_id;

    if v_current_owned >= v_max_per_user then
       return json_build_object('success', false, 'message', 'Has alcanzado el límite de compra para este objeto');
    end if;
  end if;

  -- 3. Obtener saldo BLOQUEANDO la fila (Para evitar Race Conditions / Saldos negativos)
  select current_balance into v_user_balance
  from profiles
  where id = v_user_id
  for update; 

  -- Chequeo D: ¿Tiene saldo suficiente?
  if v_user_balance < v_product_price then
    return json_build_object('success', false, 'message', 'Saldo insuficiente');
  end if;

  -- --- TRANSACCIÓN SEGURA ---

  -- 4. Restar Stock Global (si aplica)
  if v_product_stock is not null then
      update shop_products
      set stock = stock - 1
      where id = p_product_id;
  end if;

  -- 5. Añadir al Inventario
  insert into user_inventory (user_id, product_id, purchased_at, is_consumed)
  values (v_user_id, p_product_id, now(), false);

  -- 6. Crear Transacción (Tu Trigger se encarga de restar el saldo en profiles)
  insert into transactions (user_id, amount, concept, created_at)
  values (v_user_id, -v_product_price, 'Compra: ' || v_product_name, now());

  return json_build_object(
    'success', true, 
    'new_balance', (v_user_balance - v_product_price),
    'product_name', v_product_name
  );
end;
$$;


ALTER FUNCTION public.buy_item(p_product_id uuid) OWNER TO postgres;

--
-- TOC entry 440 (class 1255 OID 41794)
-- Name: check_attendance_achievements(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_attendance_achievements() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  achv_id UUID;
BEGIN
  -- Solo ejecutamos esto si el contador de asistencia realmente ha cambiado y es mayor que 0
  IF NEW.attendance_count IS DISTINCT FROM OLD.attendance_count AND NEW.attendance_count > 0 THEN
    
    -- Logro 1: Primera Chispa (1 clase)
    IF NEW.attendance_count >= 1 THEN
      SELECT id INTO achv_id FROM achievements WHERE icon_name = 'achv_class_1' LIMIT 1;
      IF achv_id IS NOT NULL THEN
        INSERT INTO user_achievements (user_id, achievement_id)
        VALUES (NEW.id, achv_id)
        ON CONFLICT (user_id, achievement_id) DO NOTHING;
      END IF;
    END IF;

    -- Logro 2: Corriente Continua (5 clases)
    IF NEW.attendance_count >= 5 THEN
      SELECT id INTO achv_id FROM achievements WHERE icon_name = 'achv_class_5' LIMIT 1;
      IF achv_id IS NOT NULL THEN
        INSERT INTO user_achievements (user_id, achievement_id)
        VALUES (NEW.id, achv_id)
        ON CONFLICT (user_id, achievement_id) DO NOTHING;
      END IF;
    END IF;

    -- Logro 3: Alta Tensión (10 clases)
    IF NEW.attendance_count >= 10 THEN
      SELECT id INTO achv_id FROM achievements WHERE icon_name = 'achv_class_10' LIMIT 1;
      IF achv_id IS NOT NULL THEN
        INSERT INTO user_achievements (user_id, achievement_id)
        VALUES (NEW.id, achv_id)
        ON CONFLICT (user_id, achievement_id) DO NOTHING;
      END IF;
    END IF;

    -- Logro 4: Sobrecarga del Sistema (20 clases)
    IF NEW.attendance_count >= 20 THEN
      SELECT id INTO achv_id FROM achievements WHERE icon_name = 'achv_class_20' LIMIT 1;
      IF achv_id IS NOT NULL THEN
        INSERT INTO user_achievements (user_id, achievement_id)
        VALUES (NEW.id, achv_id)
        ON CONFLICT (user_id, achievement_id) DO NOTHING;
      END IF;
    END IF;

  END IF;
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_attendance_achievements() OWNER TO postgres;

--
-- TOC entry 511 (class 1255 OID 41831)
-- Name: check_hack_achievement(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_hack_achievement(target_user_id uuid) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_achv_id UUID;
BEGIN
    -- 1. Buscamos el ID del logro de hacker
    SELECT id INTO v_achv_id 
    FROM achievements 
    WHERE icon_name = 'achv_hacker_fail' 
    LIMIT 1;

    IF v_achv_id IS NOT NULL THEN
        -- 2. Insertar y dejar que el trigger gestione recompensas y notificaciones
        INSERT INTO user_achievements (user_id, achievement_id)
        VALUES (target_user_id, v_achv_id)
        ON CONFLICT (user_id, achievement_id) DO NOTHING;
    END IF;
END;
$$;


ALTER FUNCTION public.check_hack_achievement(target_user_id uuid) OWNER TO postgres;

--
-- TOC entry 416 (class 1255 OID 45341)
-- Name: check_interference_achievement(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_interference_achievement(target_user_id uuid) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_achv_id UUID;
BEGIN
    -- 1. Buscamos el ID del logro de Interferencia
    SELECT id INTO v_achv_id 
    FROM achievements 
    WHERE icon_name = 'achv_interference' 
    LIMIT 1;

    IF v_achv_id IS NOT NULL THEN
        -- 2. Insertar y dejar que el trigger existente gestione recompensas y notificaciones
        INSERT INTO user_achievements (user_id, achievement_id)
        VALUES (target_user_id, v_achv_id)
        ON CONFLICT (user_id, achievement_id) DO NOTHING;
    END IF;
END;
$$;


ALTER FUNCTION public.check_interference_achievement(target_user_id uuid) OWNER TO postgres;

--
-- TOC entry 452 (class 1255 OID 41838)
-- Name: check_night_owl_achievement(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_night_owl_achievement(target_user_id uuid) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$DECLARE
    v_achv_id UUID;
    v_current_hour INTEGER;
BEGIN
    -- 1. Obtener la hora actual (España)
    v_current_hour := EXTRACT(HOUR FROM CURRENT_TIME AT TIME ZONE 'Europe/Madrid');

    -- 2. Rango de 3:00 a 5:59 AM
    IF v_current_hour >= 3 AND v_current_hour < 6 THEN
        
        -- 3. Buscamos solo el ID del logro
        SELECT id INTO v_achv_id 
        FROM achievements 
        WHERE icon_name = 'achv_night_owl' 
        LIMIT 1;

        IF v_achv_id IS NOT NULL THEN
            -- 4. Insertar. El trigger 'grant_Achievement_rewards' hará el resto.
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (target_user_id, v_achv_id)
            ON CONFLICT (user_id, achievement_id) DO NOTHING;
        END IF;
    END IF;
END;$$;


ALTER FUNCTION public.check_night_owl_achievement(target_user_id uuid) OWNER TO postgres;

--
-- TOC entry 455 (class 1255 OID 40560)
-- Name: claim_campaign_reward(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.claim_campaign_reward(p_campaign_id uuid) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  camp_record RECORD;
BEGIN
  -- Verificar si el usuario ya reclamó este premio
  IF EXISTS (SELECT 1 FROM crowdfunding_claims WHERE campaign_id = p_campaign_id AND user_id = auth.uid()) THEN
    RETURN jsonb_build_object('success', false, 'message', 'Ya has reclamado este premio.');
  END IF;

  -- Obtener datos de la campaña
  SELECT * INTO camp_record FROM crowdfunding_campaigns WHERE id = p_campaign_id;
  
  IF camp_record IS NULL OR NOT camp_record.is_completed THEN
    RETURN jsonb_build_object('success', false, 'message', 'Campaña no válida o aún no completada.');
  END IF;

  -- Insertar el registro de reclamo
  INSERT INTO crowdfunding_claims (campaign_id, user_id) 
  VALUES (p_campaign_id, auth.uid());

  -- Añadir el objeto al inventario del usuario
  INSERT INTO user_inventory (user_id, product_id) 
  VALUES (auth.uid(), camp_record.product_id);

  RETURN jsonb_build_object('success', true, 'message', 'Objeto añadido a tu inventario.');

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'message', 'Error en el servidor: ' || SQLERRM);
END;
$$;


ALTER FUNCTION public.claim_campaign_reward(p_campaign_id uuid) OWNER TO postgres;

--
-- TOC entry 481 (class 1255 OID 39409)
-- Name: contribute_to_campaign(uuid, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.contribute_to_campaign(campaign_uuid uuid, contribution_amount integer) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  user_balance INT;
  user_current_team TEXT; 
  camp_record RECORD;
  new_total INT;
  is_finished BOOLEAN;
  actual_contribution INT; -- NUEVA VARIABLE: Lo que de verdad va a pagar
  remaining_needed INT;    -- NUEVA VARIABLE: Lo que le falta a la hucha
BEGIN
  -- 1. Obtener datos del usuario
  SELECT current_balance, team 
  INTO user_balance, user_current_team 
  FROM profiles 
  WHERE id = auth.uid();

  -- 2. Verificar campaña
  SELECT * INTO camp_record FROM crowdfunding_campaigns WHERE id = campaign_uuid;
  
  IF camp_record IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Campaña no encontrada');
  END IF;

  IF camp_record.is_completed THEN
    RETURN jsonb_build_object('success', false, 'message', 'Esta campaña ya ha finalizado');
  END IF;

  -- 3. CÁLCULO DE LA APORTACIÓN REAL
  -- ¿Cuánto falta exactamente para llegar a la meta?
  remaining_needed := camp_record.target_amount - camp_record.current_amount;
  
  -- La aportación real será la cantidad menor entre lo que quiere pagar y lo que hace falta
  -- Ej: Quiere pagar 500, pero faltan 50 -> actual_contribution = 50.
  -- Ej: Quiere pagar 20, y faltan 50 -> actual_contribution = 20.
  IF contribution_amount > remaining_needed THEN
    actual_contribution := remaining_needed;
  ELSE
    actual_contribution := contribution_amount;
  END IF;

  -- Chequeo de saldo (usando la cantidad REAL que le vamos a cobrar)
  IF user_balance < actual_contribution THEN
    RETURN jsonb_build_object('success', false, 'message', 'Saldo insuficiente');
  END IF;

  -- Lógica de finalización
  new_total := camp_record.current_amount + actual_contribution;
  is_finished := (new_total >= camp_record.target_amount);

  -- 4. TRANSACCIÓN
  
  -- A. Crear registro en Transactions con la aportación REAL ajustada
  -- (Tu trigger saltará con este valor y restará lo justo)
  INSERT INTO transactions (user_id, amount, concept)
  VALUES (auth.uid(), -actual_contribution, 'Contribución a: ' || (SELECT name FROM shop_products WHERE id = camp_record.product_id));

  -- B. Registrar la contribución específica
  INSERT INTO crowdfunding_contributions (campaign_id, user_id, amount, user_team_id)
  VALUES (campaign_uuid, auth.uid(), actual_contribution, user_current_team);

  -- C. Actualizar el bote de la campaña
  UPDATE crowdfunding_campaigns
  SET 
    current_amount = current_amount + actual_contribution,
    is_completed = is_finished
  WHERE id = campaign_uuid;

  -- 5. Resultado
  -- Devuelvo 'actual_contribution' por si tu frontend quiere mostrar un mensaje tipo:
  -- "Solo necesitábamos 50, así que te hemos cobrado menos."
  RETURN jsonb_build_object(
    'success', true, 
    'campaign_completed', is_finished,
    'new_amount', new_total,
    'charged_amount', actual_contribution 
  );

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'message', 'Error en el servidor: ' || SQLERRM);
END;
$$;


ALTER FUNCTION public.contribute_to_campaign(campaign_uuid uuid, contribution_amount integer) OWNER TO postgres;

--
-- TOC entry 525 (class 1255 OID 40521)
-- Name: create_crowdfunding_campaign(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_crowdfunding_campaign(target_product_id uuid) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  prod_record RECORD;
  user_team TEXT;
  new_campaign_id UUID;
BEGIN
  SELECT * INTO prod_record FROM shop_products WHERE id = target_product_id;
  
  IF prod_record IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Producto no encontrado');
  END IF;

  IF prod_record.purchase_type = 'individual' THEN
    RETURN jsonb_build_object('success', false, 'message', 'Este producto es individual');
  END IF;

  user_team := NULL; 
  
  IF prod_record.purchase_type = 'team' THEN
    -- ¡CORRECCIÓN AQUÍ! Buscamos la columna "team"
    SELECT team INTO user_team FROM profiles WHERE id = auth.uid();
    
    IF user_team IS NULL THEN
      RETURN jsonb_build_object('success', false, 'message', 'Necesitas pertenecer a un equipo para iniciar esta campaña');
    END IF;
  END IF;

  INSERT INTO crowdfunding_campaigns (product_id, team_id, target_amount, current_amount, is_completed)
  VALUES (target_product_id, user_team, prod_record.price, 0, false)
  RETURNING id INTO new_campaign_id;

  RETURN jsonb_build_object(
    'success', true, 
    'campaign_id', new_campaign_id,
    'message', 'Campaña iniciada correctamente'
  );

EXCEPTION 
  WHEN unique_violation THEN
    RETURN jsonb_build_object('success', false, 'message', 'Ya existe una campaña activa para este producto');
  WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'message', 'Error: ' || SQLERRM);
END;
$$;


ALTER FUNCTION public.create_crowdfunding_campaign(target_product_id uuid) OWNER TO postgres;

--
-- TOC entry 425 (class 1255 OID 33407)
-- Name: get_admin_permanent_unlocks(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_admin_permanent_unlocks() RETURNS TABLE(inventory_id uuid, student_name text, student_email text, item_name text, item_icon text, unlocked_at timestamp with time zone)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  -- 1. EL GUARDIA DE SEGURIDAD:
  -- Verificamos si el usuario que llama a la función es 'admin' en la tabla profiles.
  -- Si no lo es, la función termina inmediatamente y no devuelve nada.
  IF NOT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RETURN; -- Devuelve vacío a los intrusos
  END IF;

  -- 2. LA CONSULTA VIP:
  -- Al haber pasado el control, devolvemos todos los datos saltándonos el RLS.
  RETURN QUERY
  SELECT 
    ui.id,
    p.full_name, -- Asegúrate que coincide con tu columna de nombre en profiles
    p.email,
    sp.name,
    sp.image_icon,
    ui.purchased_at
  FROM user_inventory ui
  JOIN shop_products sp ON ui.product_id = sp.id
  JOIN profiles p ON ui.user_id = p.id
  WHERE sp.category = 'permanente'
  ORDER BY ui.purchased_at DESC;
END;
$$;


ALTER FUNCTION public.get_admin_permanent_unlocks() OWNER TO postgres;

--
-- TOC entry 433 (class 1255 OID 37098)
-- Name: get_global_leaderboard(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_global_leaderboard() RETURNS TABLE(id uuid, nickname text, avatar_url text, lifetime_score bigint, team_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.nickname,
    p.avatar_url,
    COALESCE(p.lifetime_score, 0)::bigint,
    p.team      -- <--- Seleccionamos la columna real 'team' de profiles
  FROM
    profiles p
  WHERE
    p.role IS DISTINCT FROM 'admin'
  ORDER BY
    COALESCE(p.lifetime_score, 0)::bigint DESC;
END;
$$;


ALTER FUNCTION public.get_global_leaderboard() OWNER TO postgres;

--
-- TOC entry 494 (class 1255 OID 34790)
-- Name: get_secure_file_path(uuid, uuid, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_secure_file_path(p_user_id uuid, p_exercise_id uuid, p_type text) RETURNS text
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
declare
  v_has_solution boolean;
  v_question_path text;
  v_solution_path text;
begin
  -- 1. Buscamos si existe el desbloqueo para este usuario y ejercicio
  select 
    uu.has_solution,
    el.question_path,
    el.solution_path
  into
    v_has_solution,
    v_question_path,
    v_solution_path
  from user_unlocks uu
  join exercise_library el on uu.exercise_id = el.id
  where uu.user_id = p_user_id 
    and uu.exercise_id = p_exercise_id;

  -- 2. Si no encontró nada, es que no está desbloqueado
  if not found then
    raise exception 'Acceso denegado: Ejercicio no desbloqueado.';
  end if;

  -- 3. Lógica según lo que pida
  if p_type = 'statement' then
    return v_question_path;
  elsif p_type = 'solution' then
    if v_has_solution then
      return v_solution_path;
    else
      raise exception 'Acceso denegado: Solución no adquirida.';
    end if;
  else
    raise exception 'Tipo de archivo inválido';
  end if;
end;
$$;


ALTER FUNCTION public.get_secure_file_path(p_user_id uuid, p_exercise_id uuid, p_type text) OWNER TO postgres;

--
-- TOC entry 443 (class 1255 OID 37110)
-- Name: get_team_leaderboard(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_team_leaderboard(min_score_threshold integer DEFAULT 0) RETURNS TABLE(id text, name text, hex_color text, icon_key text, total_score bigint, member_count bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id::text,
    t.name,
    t.hex_color,
    t.icon_key,       -- <--- SELECCIONAMOS EL ICONO
    COALESCE(SUM(p.lifetime_score), 0)::bigint,
    COUNT(p.id)::bigint
  FROM
    teams t
  LEFT JOIN
    profiles p ON p.team = t.id 
    AND p.role IS DISTINCT FROM 'admin' 
    AND COALESCE(p.lifetime_score, 0) >= min_score_threshold
  GROUP BY
    t.id, t.name, t.hex_color, t.icon_key -- <--- AGRUPAMOS TAMBIÉN POR ICONO
  ORDER BY
    COALESCE(SUM(p.lifetime_score), 0) DESC;
END;
$$;


ALTER FUNCTION public.get_team_leaderboard(min_score_threshold integer) OWNER TO postgres;

--
-- TOC entry 436 (class 1255 OID 41796)
-- Name: grant_achievement_rewards(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.grant_achievement_rewards() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  v_achv_name TEXT;
  v_reward_electrons INTEGER;
  v_reward_product_id UUID;
  v_notification_msg TEXT;
  v_product_name TEXT;
BEGIN
  -- Buscamos la info del logro
  SELECT name, reward_electrons, reward_product_id 
  INTO v_achv_name, v_reward_electrons, v_reward_product_id
  FROM achievements
  WHERE id = NEW.achievement_id;

  -- Mensaje base
  v_notification_msg := '¡Logro desbloqueado!';

  -- ¿Da puntos?
  IF v_reward_electrons > 0 THEN
    INSERT INTO public.transactions (user_id, amount, concept)
    VALUES (NEW.user_id, v_reward_electrons, 'Logro: ' || v_achv_name);
    
    v_notification_msg := v_notification_msg || ' Recompensa: +' || v_reward_electrons || ' electrones.';
  END IF;

  -- ¿Da un objeto?
  IF v_reward_product_id IS NOT NULL THEN
    SELECT name INTO v_product_name FROM shop_products WHERE id = v_reward_product_id;
    
    INSERT INTO public.user_inventory (user_id, product_id, is_consumed)
    VALUES (NEW.user_id, v_reward_product_id, false);
    
    v_notification_msg := v_notification_msg || ' Objeto recibido: ' || v_product_name || '.';
  END IF;

  -- ¡Campanita! (Título = Nombre del logro)
  INSERT INTO public.notifications (user_id, type, title, message)
  VALUES (
    NEW.user_id,
    'ACHIEVEMENT', 
    v_achv_name, 
    v_notification_msg
  );

  RETURN NEW;
END;
$$;


ALTER FUNCTION public.grant_achievement_rewards() OWNER TO postgres;

--
-- TOC entry 506 (class 1255 OID 41951)
-- Name: handle_100_days_achievement(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_100_days_achievement() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_distinct_days INT;
    v_achv_id UUID;
BEGIN
    -- Contamos cuántos días distintos ha registrado actividad el usuario
    SELECT COUNT(DISTINCT visit_date) INTO v_distinct_days
    FROM public.site_metrics
    WHERE user_id = NEW.user_id;

    -- Si alcanza el hito de los 50 días
    IF v_distinct_days >= 50 THEN
        -- Buscamos el ID del logro
        SELECT id INTO v_achv_id 
        FROM public.achievements 
        WHERE icon_name = 'achv_logins_100' 
        LIMIT 1;

        -- Le otorgamos el logro (el ON CONFLICT evita duplicados)
        IF v_achv_id IS NOT NULL THEN
            INSERT INTO public.user_achievements (user_id, achievement_id)
            VALUES (NEW.user_id, v_achv_id)
            ON CONFLICT (user_id, achievement_id) DO NOTHING;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.handle_100_days_achievement() OWNER TO postgres;

--
-- TOC entry 426 (class 1255 OID 24389)
-- Name: handle_attendance_points(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_attendance_points() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  v_session_type text;
  v_points int;
BEGIN
  -- 1. Buscamos qué tipo de sesión era consultando la tabla de sesiones
  SELECT session_type INTO v_session_type
  FROM class_sessions
  WHERE id = NEW.session_id;

  -- 2. LÓGICA DE PUNTOS PERSONALIZADA
  IF lower(v_session_type) = 'problemas' THEN
    v_points := 60;
  ELSIF lower(v_session_type) = 'laboratorio' THEN
    v_points := 70;
  ELSE
    -- Por defecto (Teoría) o cualquier otro tipo no definido
    v_points := 50;
  END IF;

  -- 3. Insertamos la transacción en el libro mayor
  INSERT INTO public.transactions (user_id, amount, concept)
  VALUES (
    NEW.user_id, 
    v_points, 
    'Asistencia: Clase de ' || initcap(v_session_type)
  );
  
  -- 4. NUEVO: Incrementamos el contador de asistencia en profiles
  -- Usamos COALESCE por si el valor actual es NULL, lo trate como 0
  UPDATE public.profiles
  SET attendance_count = COALESCE(attendance_count, 0) + 1
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.handle_attendance_points() OWNER TO postgres;

--
-- TOC entry 497 (class 1255 OID 41740)
-- Name: handle_completed_crowdfunding(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_completed_crowdfunding() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  -- Variables para guardar los nombres reales
  campaign_name text;
  campaign_team_name text;
BEGIN
  -- Comprobamos si la campaña ACABA de pasar a completada
  IF NEW.is_completed = TRUE AND OLD.is_completed = FALSE THEN
    
    -- 1. Buscamos el nombre del producto en la tabla shop_products
    SELECT name INTO campaign_name 
    FROM shop_products 
    WHERE id = NEW.product_id;
    
    IF campaign_name IS NULL THEN
      campaign_name := 'un objeto misterioso';
    END IF;

    IF NEW.team_id IS NULL THEN
      -- CASO A: Campaña Global (team_id es NULL)
      INSERT INTO notifications (user_id, type, title, message)
      SELECT 
        id, 
        'CROWDFUNDING', 
        '¡Campaña Global Completada!', 
        'S ha conseguido financiar: ' || campaign_name
      FROM profiles;
      
    ELSE
      -- CASO B: Campaña de Equipo
      
      -- 2. Buscamos el nombre del equipo en la tabla teams
      SELECT name INTO campaign_team_name
      FROM teams
      WHERE id = NEW.team_id;
      
      -- Por si acaso un equipo se borrara, ponemos un texto por defecto
      IF campaign_team_name IS NULL THEN
        campaign_team_name := 'tu equipo';
      END IF;

      -- Insertamos la notificación incluyendo el nombre del equipo
      INSERT INTO notifications (user_id, type, title, message)
      SELECT 
        id, 
        'CROWDFUNDING', 
        '¡Campaña de Equipo Completada!', 
        'Vuestro equipo "' || campaign_team_name || '" ha logrado financiar: ' || campaign_name
      FROM profiles
      WHERE team = NEW.team_id; 
    END IF;
    
  END IF;
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.handle_completed_crowdfunding() OWNER TO postgres;

--
-- TOC entry 450 (class 1255 OID 41899)
-- Name: handle_crowdfunding_completion_achievements(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_crowdfunding_completion_achievements() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_achv_id UUID;
    v_participant RECORD;
BEGIN
    -- Solo actuamos cuando la campaña pasa de FALSE a TRUE en is_completed
    IF (OLD.is_completed = false AND NEW.is_completed = true) THEN
        
        -- 1. Identificamos el logro según el tipo de campaña (Team vs Global)
        IF NEW.team_id IS NOT NULL THEN
            -- Logro: Finalizar campaña de equipo
            SELECT id INTO v_achv_id FROM public.achievements WHERE icon_name = 'achv_crowd_team_finish' LIMIT 1;
        ELSE
            -- Logro: Finalizar campaña global
            SELECT id INTO v_achv_id FROM public.achievements WHERE icon_name = 'achv_crowd_global_finish' LIMIT 1;
        END IF;

        -- 2. Si el logro existe, se lo entregamos a todos los que contribuyeron
        IF v_achv_id IS NOT NULL THEN
            FOR v_participant IN 
                SELECT DISTINCT user_id 
                FROM public.crowdfunding_contributions 
                WHERE campaign_id = NEW.id
            LOOP
                INSERT INTO public.user_achievements (user_id, achievement_id)
                VALUES (v_participant.user_id, v_achv_id)
                ON CONFLICT (user_id, achievement_id) DO NOTHING;
                
                -- Al insertar, tu trigger centralizado 'grant_Achievement_rewards'
                -- enviará las notificaciones y los electrones a cada usuario.
            END LOOP;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.handle_crowdfunding_completion_achievements() OWNER TO postgres;

--
-- TOC entry 461 (class 1255 OID 41896)
-- Name: handle_crowdfunding_contribution_achievements(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_crowdfunding_contribution_achievements() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_team_id TEXT;
    v_achv_id UUID;
BEGIN
    -- 1. Obtenemos el team_id de la campaña para saber si es de equipo o global
    SELECT team_id INTO v_team_id 
    FROM public.crowdfunding_campaigns 
    WHERE id = NEW.campaign_id;

    -- 2. Identificamos el logro correspondiente
    IF v_team_id IS NOT NULL THEN
        -- Logro: Batería Compartida (Contribuir a equipo)
        SELECT id INTO v_achv_id FROM public.achievements WHERE icon_name = 'achv_crowd_team_contribute' LIMIT 1;
    ELSE
        -- Logro: Generador Global (Contribuir a global)
        SELECT id INTO v_achv_id FROM public.achievements WHERE icon_name = 'achv_crowd_global_contribute' LIMIT 1;
    END IF;

    -- 3. Insertamos el logro si existe
    IF v_achv_id IS NOT NULL THEN
        INSERT INTO public.user_achievements (user_id, achievement_id)
        VALUES (NEW.user_id, v_achv_id)
        ON CONFLICT (user_id, achievement_id) DO NOTHING;
        
        -- El trigger global 'grant_Achievement_rewards' se encargará de 
        -- sumar los electrones y enviar la notificación automáticamente.
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.handle_crowdfunding_contribution_achievements() OWNER TO postgres;

--
-- TOC entry 522 (class 1255 OID 41867)
-- Name: handle_item_consumption_achievements(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_item_consumption_achievements() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$DECLARE
    v_category TEXT;
    v_achv_id UUID;
BEGIN
    -- Solo actuamos si el objeto pasa de FALSE a TRUE
    IF (OLD.is_consumed = false AND NEW.is_consumed = true) THEN
        
        -- Buscamos la categoría del producto asociado
        SELECT category INTO v_category 
        FROM public.shop_products 
        WHERE id = NEW.product_id;

        -- Identificamos el logro según la categoría del producto
        CASE v_category
            WHEN 'lootbox' THEN
                SELECT id INTO v_achv_id FROM public.achievements WHERE icon_name = 'achv_first_box' LIMIT 1;
            WHEN 'key' THEN
                SELECT id INTO v_achv_id FROM public.achievements WHERE icon_name = 'achv_first_ground' LIMIT 1;
            ELSE
                v_achv_id := NULL;
        END CASE;

        -- Si hay un logro asociado, lo insertamos
        IF v_achv_id IS NOT NULL THEN
            INSERT INTO public.user_achievements (user_id, achievement_id)
            VALUES (NEW.user_id, v_achv_id)
            ON CONFLICT (user_id, achievement_id) DO NOTHING;
            
            -- NOTA: Al insertar aquí, saltará tu OTRO trigger (grant_Achievement_rewards)
            -- que es el que da los electrones y crea la notificación.
        END IF;
    END IF;

    RETURN NEW;
END;$$;


ALTER FUNCTION public.handle_item_consumption_achievements() OWNER TO postgres;

--
-- TOC entry 526 (class 1255 OID 17507)
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $_$
begin
  -- 🛑 SEGURIDAD: Comprobar dominio @uji.es
  if new.email !~* '@uji.es$' then
    raise exception 'Acceso denegado: Solo se permiten cuentas institucionales @uji.es';
  end if;

  -- ✅ Creación del perfil
  insert into public.profiles (id, email, full_name, nickname, avatar_url, current_balance)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    -- Usamos el nombre completo como nickname inicial
    new.raw_user_meta_data->>'full_name', 
    -- 👇 CAMBIO AQUÍ: Generamos avatar permanente basado en su ID único
    -- Estilos disponibles: bottts (robots), adventurer (RPG), notionists (dibujo), initials (letras)
    'https://api.dicebear.com/9.x/bottts/svg?seed=' || new.id,
    0
  );
  return new;
end;
$_$;


ALTER FUNCTION public.handle_new_user() OWNER TO postgres;

--
-- TOC entry 429 (class 1255 OID 41916)
-- Name: handle_team_join_achievement(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_team_join_achievement() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_achv_id UUID;
BEGIN
    -- Comparamos si el equipo antes era nulo/vacío y ahora tiene algo
    -- Usamos COALESCE para tratar los NULL como strings vacíos y facilitar la comparación
    IF (COALESCE(OLD.team, '') = '') AND (COALESCE(NEW.team, '') <> '') THEN
        
        -- Buscamos el ID del logro
        SELECT id INTO v_achv_id 
        FROM public.achievements 
        WHERE icon_name = 'achv_team_join' 
        LIMIT 1;

        IF v_achv_id IS NOT NULL THEN
            INSERT INTO public.user_achievements (user_id, achievement_id)
            VALUES (NEW.id, v_achv_id)
            ON CONFLICT (user_id, achievement_id) DO NOTHING;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.handle_team_join_achievement() OWNER TO postgres;

--
-- TOC entry 502 (class 1255 OID 41942)
-- Name: increment_page_visit(text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.increment_page_visit(p_path text, p_device text DEFAULT NULL::text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    INSERT INTO public.site_metrics (user_id, page_path, visit_date, visit_count, last_visit_at, device_type)
    VALUES (auth.uid(), p_path, CURRENT_DATE, 1, NOW(), p_device)
    ON CONFLICT (user_id, page_path, visit_date) 
    DO UPDATE SET 
        visit_count = site_metrics.visit_count + 1,
        last_visit_at = NOW(),
        device_type = COALESCE(p_device, site_metrics.device_type);
END;
$$;


ALTER FUNCTION public.increment_page_visit(p_path text, p_device text) OWNER TO postgres;

--
-- TOC entry 464 (class 1255 OID 34771)
-- Name: open_lootbox(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.open_lootbox(p_user_id uuid) RETURNS json
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$DECLARE
  v_box_product_id uuid;
  v_inventory_item_id uuid;
  
  -- Variables para la lotería
  v_total_weight int := 0;
  v_random_weight float;
  v_current_weight int := 0;
  v_tier_record record;
  
  -- Variables de ejecución
  v_target_exercise_id uuid;
  v_reward_text text;
  v_bonus_box boolean := false;
  v_session_record record;
  v_is_upgrade boolean := false;
  
BEGIN
  -- 1. Validaciones
  select id into v_box_product_id from shop_products where category = 'lootbox' limit 1;
  if v_box_product_id is null then raise exception 'Error: Producto no encontrado.'; end if;

  select id into v_inventory_item_id from user_inventory
  where user_inventory.user_id = p_user_id
  and product_id = v_box_product_id and is_consumed = false limit 1; 

  if v_inventory_item_id is null then raise exception 'No tienes cajas disponibles.'; end if;

  -- ==========================================================
  -- 2. FILTRADO DE TIERS
  -- ==========================================================
  CREATE TEMPORARY TABLE _valid_tiers ON COMMIT DROP AS
  SELECT * FROM loot_tiers lt
  WHERE lt.is_active = true
  AND (
      -- CASO 1: EXAMEN COMPLETO (FULL)
      (lt.reward_type = 'FULL' AND EXISTS (
          SELECT 1 FROM exercise_library el
          LEFT JOIN user_unlocks uu ON el.id = uu.exercise_id AND uu.user_id = p_user_id
          WHERE uu.exercise_id IS NULL
      ))
      OR
      -- CASO 2: EJERCICIO INDIVIDUAL (C o P)
      (lt.reward_type IN ('C', 'P') AND EXISTS (
          SELECT 1 FROM exercise_library el
          LEFT JOIN user_unlocks uu ON el.id = uu.exercise_id AND uu.user_id = p_user_id
          WHERE el.type = lt.reward_type
          AND (
             uu.exercise_id IS NULL
             OR
             (uu.has_solution = false AND lt.includes_solution = true)
          )
      ))
  );

  IF NOT EXISTS (SELECT 1 FROM _valid_tiers) THEN
      return json_build_object('status', 'refund', 'message', '¡Juego completado! No queda nada por desbloquear.');
  END IF;

  -- 3. Consumir caja
  update user_inventory set is_consumed = true, consumed_at = now() where id = v_inventory_item_id;

  -- ==========================================================
  -- 4. EL SORTEO
  -- ==========================================================
  SELECT sum(probability) INTO v_total_weight FROM _valid_tiers;
  v_random_weight := random() * v_total_weight;
  
  FOR v_tier_record IN SELECT * FROM _valid_tiers ORDER BY probability DESC LOOP
      v_current_weight := v_current_weight + v_tier_record.probability;
      IF v_current_weight >= v_random_weight THEN
          EXIT; 
      END IF;
  END LOOP;

  -- ==========================================================
  -- 5. ENTREGAR PREMIO
  -- ==========================================================
  IF v_tier_record.reward_type = 'FULL' THEN
      select academic_year, session into v_session_record
      from exercise_library el
      left join user_unlocks uu on el.id = uu.exercise_id and uu.user_id = p_user_id
      where uu.exercise_id is null
      order by random() limit 1;

      INSERT INTO public.user_unlocks (user_id, exercise_id, has_solution)
      SELECT p_user_id, id, false
      FROM exercise_library
      WHERE academic_year = v_session_record.academic_year 
      AND session = v_session_record.session
      ON CONFLICT DO NOTHING;
      
      v_reward_text := '¡LEGENDARIO! ' || v_session_record.academic_year || ' ' || v_session_record.session || ' completada.';

  ELSE
      -- Buscar ejercicio nuevo
      select id into v_target_exercise_id
      from exercise_library el
      where el.type = v_tier_record.reward_type
      and not exists (select 1 from user_unlocks uu where uu.user_id = p_user_id and uu.exercise_id = el.id)
      order by random() limit 1;
      
      -- Si no hay nuevos, buscar para MEJORAR (UPGRADE)
      if v_target_exercise_id is null and v_tier_record.includes_solution = true then
         
         -- >>> CORRECCIÓN AQUÍ: 'el.id' en lugar de 'id' <<<
         select el.id into v_target_exercise_id
         from exercise_library el
         join user_unlocks uu on el.id = uu.exercise_id
         where uu.user_id = p_user_id
         and el.type = v_tier_record.reward_type
         and uu.has_solution = false
         order by random() limit 1;
         
         v_is_upgrade := true;
      end if;

      insert into public.user_unlocks (user_id, exercise_id, has_solution)
      values (p_user_id, v_target_exercise_id, v_tier_record.includes_solution)
      on conflict (user_id, exercise_id) do update
      set has_solution = EXCLUDED.has_solution, unlocked_at = now();
      
      if v_is_upgrade then
         v_reward_text := '¡MEJORA! Solución para: ' || v_tier_record.name;
      else
         v_reward_text := 'Obtenido: ' || v_tier_record.name;
      end if;
  END IF;

  -- 6. BONUS
  if random() < 0.10 then
      insert into user_inventory (user_id, product_id, is_consumed) values (p_user_id, v_box_product_id, false);
      v_bonus_box := true;
      v_reward_text := v_reward_text || ' + CAJA EXTRA';
  end if;

  return json_build_object(
    'status', 'success',
    'message', v_reward_text,
    'tier_message', v_tier_record.message,
    'item_name', v_reward_text,
    'bonus_box', v_bonus_box,
    'tier_name', v_tier_record.name,
    'is_legendary', (v_tier_record.reward_type = 'FULL'),
    'is_upgrade', v_is_upgrade
  );
END;$$;


ALTER FUNCTION public.open_lootbox(p_user_id uuid) OWNER TO postgres;

--
-- TOC entry 465 (class 1255 OID 24426)
-- Name: register_attendance(uuid, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.register_attendance(p_session_id uuid, p_secret_code text) RETURNS json
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$declare
  v_student_id uuid;
  v_session_record record;
  v_student_group_name text; -- Variable para almacenar el grupo del alumno
begin
  -- 1. Obtenemos el ID del usuario
  v_student_id := auth.uid();
  
  if v_student_id is null then
    return json_build_object('success', false, 'message', 'Usuario no identificado');
  end if;

  -- 2. Buscamos la sesión y sus datos (incluido el grupo objetivo)
  select * into v_session_record
  from class_sessions
  where id = p_session_id;

  -- 3. Buscamos el grupo del ALUMNO en su perfil
  select student_group into v_student_group_name
  from profiles
  where id = v_student_id;

  -- --- BLOQUE DE VALIDACIONES ---

  -- A) Validar que la sesión existe
  if v_session_record is null then
    return json_build_object('success', false, 'message', 'La sesión no existe');
  end if;

  -- B) Validar que la sesión está activa
  if v_session_record.is_active = false then
    return json_build_object('success', false, 'message', 'La sesión ya está cerrada');
  end if;

  -- C) Validar código secreto del QR
  if v_session_record.secret_code != p_secret_code then
    return json_build_object('success', false, 'message', 'Código QR caducado o inválido');
  end if;

-- D) VALIDAR GRUPO (NUEVO 🛡️)
  -- Si el alumno no tiene grupo asignado o no coincide con el de la sesión: ERROR.
  if v_student_group_name is null or v_student_group_name != v_session_record.group_name then
    
    -- Lógica del logro "Interferencia" separada (⚡ NUEVO)
    -- Solo damos el logro si YA tiene grupo y ha intentado fichar en otro.
    if v_student_group_name is not null and v_student_group_name != v_session_record.group_name then
        perform check_interference_achievement(v_student_id);
    end if;

    return json_build_object(
      'success', false, 
      'message', '❌ Grupo incorrecto. Esta clase es para: ' || v_session_record.group_name
    );
  end if;

  -- E) Verificamos si ya había fichado (Idempotencia)
  if exists (select 1 from attendance where session_id = p_session_id and user_id = v_student_id) then
    return json_build_object(
      'success', true, 
      'message', 'Ya habías fichado previamente',
      'group_name', v_session_record.group_name,
      'session_type', v_session_record.session_type
    );
  end if;

  -- --- FIN VALIDACIONES ---

  -- 4. INSERTAMOS (El trigger handle_new_attendance se encargará de los puntos)
  insert into attendance (session_id, user_id)
  values (p_session_id, v_student_id);

  -- 5. Devolvemos éxito
  return json_build_object(
    'success', true, 
    'message', 'Asistencia registrada correctamente',
    'group_name', v_session_record.group_name,
    'session_type', v_session_record.session_type
  );

exception when others then
  return json_build_object('success', false, 'message', 'Error interno: ' || SQLERRM);
end;$$;


ALTER FUNCTION public.register_attendance(p_session_id uuid, p_secret_code text) OWNER TO postgres;

--
-- TOC entry 504 (class 1255 OID 24403)
-- Name: set_student_group(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_student_group(group_name text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  update public.profiles
  set student_group = group_name
  where id = auth.uid();
end;
$$;


ALTER FUNCTION public.set_student_group(group_name text) OWNER TO postgres;

--
-- TOC entry 412 (class 1255 OID 17525)
-- Name: update_balance(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_balance() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  -- Actualizar saldo actual
  update public.profiles
  set current_balance = current_balance + new.amount
  where id = new.user_id;
  
  -- Actualizar histórico (Solo si es ganancia)
  if new.amount > 0 then
    update public.profiles
    set lifetime_score = lifetime_score + new.amount
    where id = new.user_id;
  end if;
  return new;
end;
$$;


ALTER FUNCTION public.update_balance() OWNER TO postgres;

--
-- TOC entry 424 (class 1255 OID 24397)
-- Name: update_own_profile_info(text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_own_profile_info(new_nickname text, new_avatar_url text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  update public.profiles
  set 
    nickname = new_nickname,
    avatar_url = new_avatar_url
  where id = auth.uid();
end;
$$;


ALTER FUNCTION public.update_own_profile_info(new_nickname text, new_avatar_url text) OWNER TO postgres;

--
-- TOC entry 458 (class 1255 OID 34786)
-- Name: use_grounding_kit(uuid, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.use_grounding_kit(p_user_id uuid, p_exercise_id uuid) RETURNS json
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$DECLARE
  v_product_id uuid;
  v_product_name text;
  v_inventory_item_id uuid;
BEGIN
  -- 1. Obtener ID y nombre del producto con categoría 'key'
  SELECT id, name INTO v_product_id, v_product_name
  FROM shop_products 
  WHERE category = 'key'
  LIMIT 1;
  
  IF v_product_id IS NULL THEN 
    RETURN json_build_object('success', false, 'message', 'Error interno: Producto no encontrado en tienda.'); 
  END IF;

  -- 2. Buscar un ítem en el inventario que coincida con ese product_id y NO esté consumido
  SELECT id INTO v_inventory_item_id 
  FROM user_inventory
  WHERE user_id = p_user_id 
  AND product_id = v_product_id 
  AND is_consumed = false 
  LIMIT 1;

  IF v_inventory_item_id IS NULL THEN 
    RETURN json_build_object('success', false, 'message', 'No tienes ' || v_product_name || ' disponibles.'); 
  END IF;

  -- 3. Verificar si ya tiene solución
  IF EXISTS (
      SELECT 1 FROM user_unlocks 
      WHERE user_id = p_user_id 
      AND exercise_id = p_exercise_id 
      AND has_solution = true
  ) THEN
      RETURN json_build_object('success', true, 'message', 'Ya tenías la solución desbloqueada.');
  END IF;

  -- 4. Consumir el ítem (Update atómico)
  UPDATE user_inventory 
  SET is_consumed = true, consumed_at = now() 
  WHERE id = v_inventory_item_id;

  -- 5. Desbloquear solución
  UPDATE user_unlocks 
  SET has_solution = true 
  WHERE user_id = p_user_id AND exercise_id = p_exercise_id;

  RETURN json_build_object('success', true, 'message', 'Solución desbloqueada correctamente.');
END;$$;


ALTER FUNCTION public.use_grounding_kit(p_user_id uuid, p_exercise_id uuid) OWNER TO postgres;

--
-- TOC entry 520 (class 1255 OID 17385)
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_
        -- Filter by action early - only get subscriptions interested in this action
        -- action_filter column can be: '*' (all), 'INSERT', 'UPDATE', or 'DELETE'
        and (subs.action_filter = '*' or subs.action_filter = action::text);

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- TOC entry 530 (class 1255 OID 17464)
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- TOC entry 556 (class 1255 OID 17397)
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- TOC entry 444 (class 1255 OID 17347)
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- TOC entry 510 (class 1255 OID 17342)
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- TOC entry 545 (class 1255 OID 17393)
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- TOC entry 418 (class 1255 OID 17404)
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- TOC entry 483 (class 1255 OID 17341)
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- TOC entry 421 (class 1255 OID 17463)
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
  final_payload jsonb;
BEGIN
  BEGIN
    -- Generate a new UUID for the id
    generated_id := gen_random_uuid();

    -- Check if payload has an 'id' key, if not, add the generated UUID
    IF payload ? 'id' THEN
      final_payload := payload;
    ELSE
      final_payload := jsonb_set(payload, '{id}', to_jsonb(generated_id));
    END IF;

    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (id, payload, event, topic, private, extension)
    VALUES (generated_id, final_payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- TOC entry 557 (class 1255 OID 17339)
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- TOC entry 487 (class 1255 OID 17374)
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- TOC entry 519 (class 1255 OID 17457)
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- TOC entry 547 (class 1255 OID 17145)
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- TOC entry 482 (class 1255 OID 17259)
-- Name: delete_leaf_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_rows_deleted integer;
BEGIN
    LOOP
        WITH candidates AS (
            SELECT DISTINCT
                t.bucket_id,
                unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        ),
        uniq AS (
             SELECT
                 bucket_id,
                 name,
                 storage.get_level(name) AS level
             FROM candidates
             WHERE name <> ''
             GROUP BY bucket_id, name
        ),
        leaf AS (
             SELECT
                 p.bucket_id,
                 p.name,
                 p.level
             FROM storage.prefixes AS p
                  JOIN uniq AS u
                       ON u.bucket_id = p.bucket_id
                           AND u.name = p.name
                           AND u.level = p.level
             WHERE NOT EXISTS (
                 SELECT 1
                 FROM storage.objects AS o
                 WHERE o.bucket_id = p.bucket_id
                   AND o.level = p.level + 1
                   AND o.name COLLATE "C" LIKE p.name || '/%'
             )
             AND NOT EXISTS (
                 SELECT 1
                 FROM storage.prefixes AS c
                 WHERE c.bucket_id = p.bucket_id
                   AND c.level = p.level + 1
                   AND c.name COLLATE "C" LIKE p.name || '/%'
             )
        )
        DELETE
        FROM storage.prefixes AS p
            USING leaf AS l
        WHERE p.bucket_id = l.bucket_id
          AND p.name = l.name
          AND p.level = l.level;

        GET DIAGNOSTICS v_rows_deleted = ROW_COUNT;
        EXIT WHEN v_rows_deleted = 0;
    END LOOP;
END;
$$;


ALTER FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- TOC entry 493 (class 1255 OID 17238)
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- TOC entry 476 (class 1255 OID 17119)
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    SELECT string_to_array(name, '/') INTO _parts;
    SELECT _parts[array_length(_parts,1)] INTO _filename;
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 484 (class 1255 OID 17118)
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 550 (class 1255 OID 17117)
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 422 (class 1255 OID 37052)
-- Name: get_common_prefix(text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $$
SELECT CASE
    WHEN position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)) > 0
    THEN left(p_key, length(p_prefix) + position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)))
    ELSE NULL
END;
$$;


ALTER FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) OWNER TO supabase_storage_admin;

--
-- TOC entry 420 (class 1255 OID 17201)
-- Name: get_level(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_level(name text) RETURNS integer
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
SELECT array_length(string_to_array("name", '/'), 1);
$$;


ALTER FUNCTION storage.get_level(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 486 (class 1255 OID 17217)
-- Name: get_prefix(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefix(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
SELECT
    CASE WHEN strpos("name", '/') > 0 THEN
             regexp_replace("name", '[\/]{1}[^\/]+\/?$', '')
         ELSE
             ''
        END;
$_$;


ALTER FUNCTION storage.get_prefix(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 478 (class 1255 OID 17218)
-- Name: get_prefixes(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefixes(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
    parts text[];
    prefixes text[];
    prefix text;
BEGIN
    -- Split the name into parts by '/'
    parts := string_to_array("name", '/');
    prefixes := '{}';

    -- Construct the prefixes, stopping one level below the last part
    FOR i IN 1..array_length(parts, 1) - 1 LOOP
            prefix := array_to_string(parts[1:i], '/');
            prefixes := array_append(prefixes, prefix);
    END LOOP;

    RETURN prefixes;
END;
$$;


ALTER FUNCTION storage.get_prefixes(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 529 (class 1255 OID 17236)
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- TOC entry 472 (class 1255 OID 17184)
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- TOC entry 466 (class 1255 OID 37053)
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;

    -- Configuration
    v_is_asc BOOLEAN;
    v_prefix TEXT;
    v_start TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_is_asc := lower(coalesce(sort_order, 'asc')) = 'asc';
    v_prefix := coalesce(prefix_param, '');
    v_start := CASE WHEN coalesce(next_token, '') <> '' THEN next_token ELSE coalesce(start_after, '') END;
    v_file_batch_size := LEAST(GREATEST(max_keys * 2, 100), 1000);

    -- Calculate upper bound for prefix filtering (bytewise, using COLLATE "C")
    IF v_prefix = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix, 1) = delimiter_param THEN
        v_upper_bound := left(v_prefix, -1) || chr(ascii(delimiter_param) + 1);
    ELSE
        v_upper_bound := left(v_prefix, -1) || chr(ascii(right(v_prefix, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'AND o.name COLLATE "C" < $3 ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'AND o.name COLLATE "C" >= $3 ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- ========================================================================
    -- SEEK INITIALIZATION: Determine starting position
    -- ========================================================================
    IF v_start = '' THEN
        IF v_is_asc THEN
            v_next_seek := v_prefix;
        ELSE
            -- DESC without cursor: find the last item in range
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;

            IF v_next_seek IS NOT NULL THEN
                v_next_seek := v_next_seek || delimiter_param;
            ELSE
                RETURN;
            END IF;
        END IF;
    ELSE
        -- Cursor provided: determine if it refers to a folder or leaf
        IF EXISTS (
            SELECT 1 FROM storage.objects o
            WHERE o.bucket_id = _bucket_id
              AND o.name COLLATE "C" LIKE v_start || delimiter_param || '%'
            LIMIT 1
        ) THEN
            -- Cursor refers to a folder
            IF v_is_asc THEN
                v_next_seek := v_start || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_start || delimiter_param;
            END IF;
        ELSE
            -- Cursor refers to a leaf object
            IF v_is_asc THEN
                v_next_seek := v_start || delimiter_param;
            ELSE
                v_next_seek := v_start;
            END IF;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= max_keys;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(v_peek_name, v_prefix, delimiter_param);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Emit and skip to next folder (no heap access needed)
            name := rtrim(v_common_prefix, delimiter_param);
            id := NULL;
            updated_at := NULL;
            created_at := NULL;
            last_accessed_at := NULL;
            metadata := NULL;
            RETURN NEXT;
            v_count := v_count + 1;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := left(v_common_prefix, -1) || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_common_prefix;
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query USING _bucket_id, v_next_seek,
                CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix) ELSE v_prefix END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(v_current.name, v_prefix, delimiter_param);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := v_current.name;
                    EXIT;
                END IF;

                -- Emit file
                name := v_current.name;
                id := v_current.id;
                updated_at := v_current.updated_at;
                created_at := v_current.created_at;
                last_accessed_at := v_current.last_accessed_at;
                metadata := v_current.metadata;
                RETURN NEXT;
                v_count := v_count + 1;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := v_current.name || delimiter_param;
                ELSE
                    v_next_seek := v_current.name;
                END IF;

                EXIT WHEN v_count >= max_keys;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text, sort_order text) OWNER TO supabase_storage_admin;

--
-- TOC entry 451 (class 1255 OID 17200)
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- TOC entry 499 (class 1255 OID 37058)
-- Name: protect_delete(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.protect_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Check if storage.allow_delete_query is set to 'true'
    IF COALESCE(current_setting('storage.allow_delete_query', true), 'false') != 'true' THEN
        RAISE EXCEPTION 'Direct deletion from storage tables is not allowed. Use the Storage API instead.'
            USING HINT = 'This prevents accidental data loss from orphaned objects.',
                  ERRCODE = '42501';
    END IF;
    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.protect_delete() OWNER TO supabase_storage_admin;

--
-- TOC entry 507 (class 1255 OID 17134)
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;
    v_delimiter CONSTANT TEXT := '/';

    -- Configuration
    v_limit INT;
    v_prefix TEXT;
    v_prefix_lower TEXT;
    v_is_asc BOOLEAN;
    v_order_by TEXT;
    v_sort_order TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;
    v_skipped INT := 0;
BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_limit := LEAST(coalesce(limits, 100), 1500);
    v_prefix := coalesce(prefix, '') || coalesce(search, '');
    v_prefix_lower := lower(v_prefix);
    v_is_asc := lower(coalesce(sortorder, 'asc')) = 'asc';
    v_file_batch_size := LEAST(GREATEST(v_limit * 2, 100), 1000);

    -- Validate sort column
    CASE lower(coalesce(sortcolumn, 'name'))
        WHEN 'name' THEN v_order_by := 'name';
        WHEN 'updated_at' THEN v_order_by := 'updated_at';
        WHEN 'created_at' THEN v_order_by := 'created_at';
        WHEN 'last_accessed_at' THEN v_order_by := 'last_accessed_at';
        ELSE v_order_by := 'name';
    END CASE;

    v_sort_order := CASE WHEN v_is_asc THEN 'asc' ELSE 'desc' END;

    -- ========================================================================
    -- NON-NAME SORTING: Use path_tokens approach (unchanged)
    -- ========================================================================
    IF v_order_by != 'name' THEN
        RETURN QUERY EXECUTE format(
            $sql$
            WITH folders AS (
                SELECT path_tokens[$1] AS folder
                FROM storage.objects
                WHERE objects.name ILIKE $2 || '%%'
                  AND bucket_id = $3
                  AND array_length(objects.path_tokens, 1) <> $1
                GROUP BY folder
                ORDER BY folder %s
            )
            (SELECT folder AS "name",
                   NULL::uuid AS id,
                   NULL::timestamptz AS updated_at,
                   NULL::timestamptz AS created_at,
                   NULL::timestamptz AS last_accessed_at,
                   NULL::jsonb AS metadata FROM folders)
            UNION ALL
            (SELECT path_tokens[$1] AS "name",
                   id, updated_at, created_at, last_accessed_at, metadata
             FROM storage.objects
             WHERE objects.name ILIKE $2 || '%%'
               AND bucket_id = $3
               AND array_length(objects.path_tokens, 1) = $1
             ORDER BY %I %s)
            LIMIT $4 OFFSET $5
            $sql$, v_sort_order, v_order_by, v_sort_order
        ) USING levels, v_prefix, bucketname, v_limit, offsets;
        RETURN;
    END IF;

    -- ========================================================================
    -- NAME SORTING: Hybrid skip-scan with batch optimization
    -- ========================================================================

    -- Calculate upper bound for prefix filtering
    IF v_prefix_lower = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix_lower, 1) = v_delimiter THEN
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(v_delimiter) + 1);
    ELSE
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(right(v_prefix_lower, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'AND lower(o.name) COLLATE "C" < $3 ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'AND lower(o.name) COLLATE "C" >= $3 ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- Initialize seek position
    IF v_is_asc THEN
        v_next_seek := v_prefix_lower;
    ELSE
        -- DESC: find the last item in range first (static SQL)
        IF v_upper_bound IS NOT NULL THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower AND lower(o.name) COLLATE "C" < v_upper_bound
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSIF v_prefix_lower <> '' THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSE
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        END IF;

        IF v_peek_name IS NOT NULL THEN
            v_next_seek := lower(v_peek_name) || v_delimiter;
        ELSE
            RETURN;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= v_limit;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek AND lower(o.name) COLLATE "C" < v_upper_bound
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix_lower <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(lower(v_peek_name), v_prefix_lower, v_delimiter);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Handle offset, emit if needed, skip to next folder
            IF v_skipped < offsets THEN
                v_skipped := v_skipped + 1;
            ELSE
                name := split_part(rtrim(storage.get_common_prefix(v_peek_name, v_prefix, v_delimiter), v_delimiter), v_delimiter, levels);
                id := NULL;
                updated_at := NULL;
                created_at := NULL;
                last_accessed_at := NULL;
                metadata := NULL;
                RETURN NEXT;
                v_count := v_count + 1;
            END IF;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := lower(left(v_common_prefix, -1)) || chr(ascii(v_delimiter) + 1);
            ELSE
                v_next_seek := lower(v_common_prefix);
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix_lower is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query
                USING bucketname, v_next_seek,
                    CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix_lower) ELSE v_prefix_lower END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(lower(v_current.name), v_prefix_lower, v_delimiter);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := lower(v_current.name);
                    EXIT;
                END IF;

                -- Handle offset skipping
                IF v_skipped < offsets THEN
                    v_skipped := v_skipped + 1;
                ELSE
                    -- Emit file
                    name := split_part(v_current.name, v_delimiter, levels);
                    id := v_current.id;
                    updated_at := v_current.updated_at;
                    created_at := v_current.created_at;
                    last_accessed_at := v_current.last_accessed_at;
                    metadata := v_current.metadata;
                    RETURN NEXT;
                    v_count := v_count + 1;
                END IF;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := lower(v_current.name) || v_delimiter;
                ELSE
                    v_next_seek := lower(v_current.name);
                END IF;

                EXIT WHEN v_count >= v_limit;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- TOC entry 508 (class 1255 OID 37056)
-- Name: search_by_timestamp(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_cursor_op text;
    v_query text;
    v_prefix text;
BEGIN
    v_prefix := coalesce(p_prefix, '');

    IF p_sort_order = 'asc' THEN
        v_cursor_op := '>';
    ELSE
        v_cursor_op := '<';
    END IF;

    v_query := format($sql$
        WITH raw_objects AS (
            SELECT
                o.name AS obj_name,
                o.id AS obj_id,
                o.updated_at AS obj_updated_at,
                o.created_at AS obj_created_at,
                o.last_accessed_at AS obj_last_accessed_at,
                o.metadata AS obj_metadata,
                storage.get_common_prefix(o.name, $1, '/') AS common_prefix
            FROM storage.objects o
            WHERE o.bucket_id = $2
              AND o.name COLLATE "C" LIKE $1 || '%%'
        ),
        -- Aggregate common prefixes (folders)
        -- Both created_at and updated_at use MIN(obj_created_at) to match the old prefixes table behavior
        aggregated_prefixes AS (
            SELECT
                rtrim(common_prefix, '/') AS name,
                NULL::uuid AS id,
                MIN(obj_created_at) AS updated_at,
                MIN(obj_created_at) AS created_at,
                NULL::timestamptz AS last_accessed_at,
                NULL::jsonb AS metadata,
                TRUE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NOT NULL
            GROUP BY common_prefix
        ),
        leaf_objects AS (
            SELECT
                obj_name AS name,
                obj_id AS id,
                obj_updated_at AS updated_at,
                obj_created_at AS created_at,
                obj_last_accessed_at AS last_accessed_at,
                obj_metadata AS metadata,
                FALSE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NULL
        ),
        combined AS (
            SELECT * FROM aggregated_prefixes
            UNION ALL
            SELECT * FROM leaf_objects
        ),
        filtered AS (
            SELECT *
            FROM combined
            WHERE (
                $5 = ''
                OR ROW(
                    date_trunc('milliseconds', %I),
                    name COLLATE "C"
                ) %s ROW(
                    COALESCE(NULLIF($6, '')::timestamptz, 'epoch'::timestamptz),
                    $5
                )
            )
        )
        SELECT
            split_part(name, '/', $3) AS key,
            name,
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
        FROM filtered
        ORDER BY
            COALESCE(date_trunc('milliseconds', %I), 'epoch'::timestamptz) %s,
            name COLLATE "C" %s
        LIMIT $4
    $sql$,
        p_sort_column,
        v_cursor_op,
        p_sort_column,
        p_sort_order,
        p_sort_order
    );

    RETURN QUERY EXECUTE v_query
    USING v_prefix, p_bucket_id, p_level, p_limit, p_start_after, p_sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) OWNER TO supabase_storage_admin;

--
-- TOC entry 531 (class 1255 OID 17234)
-- Name: search_legacy_v1(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select path_tokens[$1] as folder
           from storage.objects
             where objects.name ilike $2 || $3 || ''%''
               and bucket_id = $4
               and array_length(objects.path_tokens, 1) <> $1
           group by folder
           order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- TOC entry 523 (class 1255 OID 17257)
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    v_sort_col text;
    v_sort_ord text;
    v_limit int;
BEGIN
    -- Cap limit to maximum of 1500 records
    v_limit := LEAST(coalesce(limits, 100), 1500);

    -- Validate and normalize sort_order
    v_sort_ord := lower(coalesce(sort_order, 'asc'));
    IF v_sort_ord NOT IN ('asc', 'desc') THEN
        v_sort_ord := 'asc';
    END IF;

    -- Validate and normalize sort_column
    v_sort_col := lower(coalesce(sort_column, 'name'));
    IF v_sort_col NOT IN ('name', 'updated_at', 'created_at') THEN
        v_sort_col := 'name';
    END IF;

    -- Route to appropriate implementation
    IF v_sort_col = 'name' THEN
        -- Use list_objects_with_delimiter for name sorting (most efficient: O(k * log n))
        RETURN QUERY
        SELECT
            split_part(l.name, '/', levels) AS key,
            l.name AS name,
            l.id,
            l.updated_at,
            l.created_at,
            l.last_accessed_at,
            l.metadata
        FROM storage.list_objects_with_delimiter(
            bucket_name,
            coalesce(prefix, ''),
            '/',
            v_limit,
            start_after,
            '',
            v_sort_ord
        ) l;
    ELSE
        -- Use aggregation approach for timestamp sorting
        -- Not efficient for large datasets but supports correct pagination
        RETURN QUERY SELECT * FROM storage.search_by_timestamp(
            prefix, bucket_name, v_limit, levels, start_after,
            v_sort_ord, v_sort_col, sort_column_after
        );
    END IF;
END;
$$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO supabase_storage_admin;

--
-- TOC entry 437 (class 1255 OID 17135)
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 354 (class 1259 OID 16525)
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- TOC entry 4582 (class 0 OID 0)
-- Dependencies: 354
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- TOC entry 368 (class 1259 OID 16883)
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text,
    code_challenge_method auth.code_challenge_method,
    code_challenge text,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone,
    invite_token text,
    referrer text,
    oauth_client_state_id uuid,
    linking_target_id uuid,
    email_optional boolean DEFAULT false NOT NULL
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- TOC entry 4584 (class 0 OID 0)
-- Dependencies: 368
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'Stores metadata for all OAuth/SSO login flows';


--
-- TOC entry 359 (class 1259 OID 16681)
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- TOC entry 4586 (class 0 OID 0)
-- Dependencies: 359
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- TOC entry 4587 (class 0 OID 0)
-- Dependencies: 359
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- TOC entry 353 (class 1259 OID 16518)
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- TOC entry 4589 (class 0 OID 0)
-- Dependencies: 353
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- TOC entry 363 (class 1259 OID 16770)
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- TOC entry 4591 (class 0 OID 0)
-- Dependencies: 363
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- TOC entry 362 (class 1259 OID 16758)
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- TOC entry 4593 (class 0 OID 0)
-- Dependencies: 362
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- TOC entry 361 (class 1259 OID 16745)
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid,
    last_webauthn_challenge_data jsonb
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- TOC entry 4595 (class 0 OID 0)
-- Dependencies: 361
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- TOC entry 4596 (class 0 OID 0)
-- Dependencies: 361
-- Name: COLUMN mfa_factors.last_webauthn_challenge_data; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.mfa_factors.last_webauthn_challenge_data IS 'Stores the latest WebAuthn challenge data including attestation/assertion for customer verification';


--
-- TOC entry 371 (class 1259 OID 16995)
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    nonce text,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_nonce_length CHECK ((char_length(nonce) <= 255)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


ALTER TABLE auth.oauth_authorizations OWNER TO supabase_auth_admin;

--
-- TOC entry 373 (class 1259 OID 17068)
-- Name: oauth_client_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_client_states (
    id uuid NOT NULL,
    provider_type text NOT NULL,
    code_verifier text,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE auth.oauth_client_states OWNER TO supabase_auth_admin;

--
-- TOC entry 4599 (class 0 OID 0)
-- Dependencies: 373
-- Name: TABLE oauth_client_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.oauth_client_states IS 'Stores OAuth states for third-party provider authentication flows where Supabase acts as the OAuth client.';


--
-- TOC entry 370 (class 1259 OID 16965)
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    token_endpoint_auth_method text NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048)),
    CONSTRAINT oauth_clients_token_endpoint_auth_method_check CHECK ((token_endpoint_auth_method = ANY (ARRAY['client_secret_basic'::text, 'client_secret_post'::text, 'none'::text])))
);


ALTER TABLE auth.oauth_clients OWNER TO supabase_auth_admin;

--
-- TOC entry 372 (class 1259 OID 17028)
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


ALTER TABLE auth.oauth_consents OWNER TO supabase_auth_admin;

--
-- TOC entry 369 (class 1259 OID 16933)
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- TOC entry 352 (class 1259 OID 16507)
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- TOC entry 4604 (class 0 OID 0)
-- Dependencies: 352
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- TOC entry 351 (class 1259 OID 16506)
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- TOC entry 4606 (class 0 OID 0)
-- Dependencies: 351
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- TOC entry 366 (class 1259 OID 16812)
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- TOC entry 4608 (class 0 OID 0)
-- Dependencies: 366
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- TOC entry 367 (class 1259 OID 16830)
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- TOC entry 4610 (class 0 OID 0)
-- Dependencies: 367
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- TOC entry 355 (class 1259 OID 16533)
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- TOC entry 4612 (class 0 OID 0)
-- Dependencies: 355
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- TOC entry 360 (class 1259 OID 16711)
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid,
    refresh_token_hmac_key text,
    refresh_token_counter bigint,
    scopes text,
    CONSTRAINT sessions_scopes_length CHECK ((char_length(scopes) <= 4096))
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- TOC entry 4614 (class 0 OID 0)
-- Dependencies: 360
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- TOC entry 4615 (class 0 OID 0)
-- Dependencies: 360
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- TOC entry 4616 (class 0 OID 0)
-- Dependencies: 360
-- Name: COLUMN sessions.refresh_token_hmac_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_hmac_key IS 'Holds a HMAC-SHA256 key used to sign refresh tokens for this session.';


--
-- TOC entry 4617 (class 0 OID 0)
-- Dependencies: 360
-- Name: COLUMN sessions.refresh_token_counter; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_counter IS 'Holds the ID (counter) of the last issued refresh token.';


--
-- TOC entry 365 (class 1259 OID 16797)
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- TOC entry 4619 (class 0 OID 0)
-- Dependencies: 365
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- TOC entry 364 (class 1259 OID 16788)
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- TOC entry 4621 (class 0 OID 0)
-- Dependencies: 364
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- TOC entry 4622 (class 0 OID 0)
-- Dependencies: 364
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- TOC entry 350 (class 1259 OID 16495)
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- TOC entry 4624 (class 0 OID 0)
-- Dependencies: 350
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- TOC entry 4625 (class 0 OID 0)
-- Dependencies: 350
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- TOC entry 405 (class 1259 OID 41748)
-- Name: achievements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.achievements (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    icon_name text NOT NULL,
    reward_electrons integer DEFAULT 0,
    reward_product_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    category public.achievement_category DEFAULT 'especial'::public.achievement_category NOT NULL
);


ALTER TABLE public.achievements OWNER TO postgres;

--
-- TOC entry 392 (class 1259 OID 24367)
-- Name: attendance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attendance (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    session_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.attendance OWNER TO postgres;

--
-- TOC entry 391 (class 1259 OID 24355)
-- Name: class_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.class_sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text,
    group_name text NOT NULL,
    session_type text NOT NULL,
    secret_code text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    teacher_id uuid DEFAULT auth.uid() NOT NULL
);


ALTER TABLE public.class_sessions OWNER TO postgres;

--
-- TOC entry 400 (class 1259 OID 39363)
-- Name: crowdfunding_campaigns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.crowdfunding_campaigns (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    product_id uuid,
    team_id text,
    current_amount integer DEFAULT 0,
    target_amount integer NOT NULL,
    is_completed boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.crowdfunding_campaigns OWNER TO postgres;

--
-- TOC entry 403 (class 1259 OID 40544)
-- Name: crowdfunding_claims; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.crowdfunding_claims (
    campaign_id uuid NOT NULL,
    user_id uuid NOT NULL,
    claimed_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.crowdfunding_claims OWNER TO postgres;

--
-- TOC entry 402 (class 1259 OID 39390)
-- Name: crowdfunding_contributions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.crowdfunding_contributions (
    id bigint NOT NULL,
    campaign_id uuid,
    user_id uuid,
    amount integer NOT NULL,
    contributed_at timestamp with time zone DEFAULT now(),
    user_team_id text
);


ALTER TABLE public.crowdfunding_contributions OWNER TO postgres;

--
-- TOC entry 401 (class 1259 OID 39389)
-- Name: crowdfunding_contributions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.crowdfunding_contributions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.crowdfunding_contributions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 395 (class 1259 OID 34516)
-- Name: exercise_library; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise_library (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    academic_year text NOT NULL,
    session text NOT NULL,
    type text NOT NULL,
    number integer NOT NULL,
    question_path text NOT NULL,
    solution_path text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.exercise_library OWNER TO postgres;

--
-- TOC entry 398 (class 1259 OID 34561)
-- Name: loot_tiers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loot_tiers (
    id integer NOT NULL,
    name text NOT NULL,
    probability integer NOT NULL,
    reward_type text NOT NULL,
    includes_solution boolean DEFAULT false,
    is_active boolean DEFAULT true,
    message text DEFAULT 'Has obtenido:'::text
);


ALTER TABLE public.loot_tiers OWNER TO postgres;

--
-- TOC entry 397 (class 1259 OID 34560)
-- Name: loot_tiers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loot_tiers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.loot_tiers_id_seq OWNER TO postgres;

--
-- TOC entry 4640 (class 0 OID 0)
-- Dependencies: 397
-- Name: loot_tiers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loot_tiers_id_seq OWNED BY public.loot_tiers.id;


--
-- TOC entry 404 (class 1259 OID 41710)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    type character varying(50) NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    is_read boolean DEFAULT false,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 389 (class 1259 OID 17490)
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text,
    full_name text,
    nickname text,
    avatar_url text,
    team_id integer,
    current_balance integer DEFAULT 0,
    lifetime_score integer DEFAULT 0,
    role text DEFAULT 'student'::text,
    student_group text,
    attendance_count integer DEFAULT 0,
    team text
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- TOC entry 393 (class 1259 OID 28863)
-- Name: shop_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shop_products (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    price integer NOT NULL,
    image_icon text,
    category text DEFAULT 'item'::text,
    max_per_user integer,
    stock integer,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    purchase_type text DEFAULT 'individual'::text,
    CONSTRAINT shop_products_price_check CHECK ((price >= 0)),
    CONSTRAINT shop_products_purchase_type_check CHECK ((purchase_type = ANY (ARRAY['individual'::text, 'team'::text, 'global'::text])))
);


ALTER TABLE public.shop_products OWNER TO postgres;

--
-- TOC entry 407 (class 1259 OID 41926)
-- Name: site_metrics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.site_metrics (
    user_id uuid NOT NULL,
    page_path text NOT NULL,
    visit_date date DEFAULT CURRENT_DATE NOT NULL,
    visit_count integer DEFAULT 1,
    last_visit_at timestamp with time zone DEFAULT now(),
    device_type text
);


ALTER TABLE public.site_metrics OWNER TO postgres;

--
-- TOC entry 399 (class 1259 OID 37033)
-- Name: teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teams (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    hex_color text NOT NULL,
    icon_key text
);


ALTER TABLE public.teams OWNER TO postgres;

--
-- TOC entry 390 (class 1259 OID 17509)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    amount integer NOT NULL,
    concept text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 406 (class 1259 OID 41764)
-- Name: user_achievements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_achievements (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    achievement_id uuid,
    unlocked_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.user_achievements OWNER TO postgres;

--
-- TOC entry 394 (class 1259 OID 28875)
-- Name: user_inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_inventory (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    product_id uuid NOT NULL,
    is_consumed boolean DEFAULT false,
    purchased_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    consumed_at timestamp with time zone
);


ALTER TABLE public.user_inventory OWNER TO postgres;

--
-- TOC entry 396 (class 1259 OID 34527)
-- Name: user_unlocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_unlocks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    exercise_id uuid,
    has_solution boolean DEFAULT false,
    unlocked_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.user_unlocks OWNER TO postgres;

--
-- TOC entry 388 (class 1259 OID 17467)
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- TOC entry 374 (class 1259 OID 17076)
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- TOC entry 385 (class 1259 OID 17327)
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    action_filter text DEFAULT '*'::text,
    CONSTRAINT subscription_action_filter_check CHECK ((action_filter = ANY (ARRAY['*'::text, 'INSERT'::text, 'UPDATE'::text, 'DELETE'::text])))
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- TOC entry 384 (class 1259 OID 17326)
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 376 (class 1259 OID 17089)
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- TOC entry 4657 (class 0 OID 0)
-- Dependencies: 376
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- TOC entry 380 (class 1259 OID 17246)
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    name text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- TOC entry 381 (class 1259 OID 17273)
-- Name: buckets_vectors; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_vectors (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'VECTOR'::storage.buckettype NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_vectors OWNER TO supabase_storage_admin;

--
-- TOC entry 375 (class 1259 OID 17081)
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- TOC entry 377 (class 1259 OID 17099)
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- TOC entry 4661 (class 0 OID 0)
-- Dependencies: 377
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- TOC entry 378 (class 1259 OID 17149)
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- TOC entry 379 (class 1259 OID 17163)
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- TOC entry 382 (class 1259 OID 17283)
-- Name: vector_indexes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.vector_indexes (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    bucket_id text NOT NULL,
    data_type text NOT NULL,
    dimension integer NOT NULL,
    distance_metric text NOT NULL,
    metadata_configuration jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.vector_indexes OWNER TO supabase_storage_admin;

--
-- TOC entry 3795 (class 2604 OID 16510)
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- TOC entry 3875 (class 2604 OID 34564)
-- Name: loot_tiers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loot_tiers ALTER COLUMN id SET DEFAULT nextval('public.loot_tiers_id_seq'::regclass);


--
-- TOC entry 4408 (class 0 OID 16525)
-- Dependencies: 354
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- TOC entry 4419 (class 0 OID 16883)
-- Dependencies: 368
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at, invite_token, referrer, oauth_client_state_id, linking_target_id, email_optional) FROM stdin;
17f7b510-c7aa-46ce-82e9-2fd0f6f23f5b	4c3c3664-a24c-4a0d-9d7d-06f7ab0deb0c	811a84bd-0640-4ad9-b64b-fc63f2e12ac4	s256	eUi0sB_4wtPNZNFeYKfgenJWJAdr20xQSeAUWDeBUNM	google	ya29.a0AUMWg_I7lOJh3_ZxIVI7VI607hOdo79GC9M2vUqvo6r3kuKb_SxbHY8FwlpG1mzxWoouWJo2IwHbob1Uh0OBJVw0Op1Y2HuTjvdNHJYLvz5EtZjxvQcmcIWZgModeXbj5dHNLLmlJIbVadmwdfiAOpef_zsLDFdZ-Y6uEKLpR14u2i7lfUq8s0XYh7DPEP5yhNRiivwaCgYKAcwSARESFQHGX2MiDDp1aPqubSKcbunq8HTTfg0206	1//03zJ1Xskm5F4MCgYIARAAGAMSNwF-L9Ir22xbhnrsMRYtAD7dlEKuW0HDg4ckSCFQtzLyaNQxy863yC9KomkQcfKFgc7qNXh_vnc	2026-01-24 13:06:52.710706+00	2026-01-24 13:06:58.071859+00	oauth	2026-01-24 13:06:58.071803+00	\N	\N	\N	\N	f
3d7f0636-c57f-4821-a62c-74a8bffc8569	69d7b188-4d2d-40de-9bbb-dca74b0637e2	1d559d63-2e93-4bbc-af70-8a9cbfa731ac	plain	da0296aa9f14a7f6afd3c234a3efa97274c6b940558165c4119ab88ebb9496c553e2e57da206a1fddcaaf4a92cd2dbe538a83cf0bc0fb173	google	ya29.A0AUMWg_Ka0kUBXr3i6ZiLlxwClBKSJDyXmjGxnfo9wef6N9pCnbsfQakavp4zE5r7EaalZiWTsBsFWHYmZFig01WGRt5JQKUFlDwbIFN6yt-cCW4bX5NY16syWzFpJaPJ8WvssnGx0MDtLoD_wMmKs9-5z3js6n7iAqGDPyP2igkAsJXUBG-fgG9EGy01AZ4LZx0y194VbsvH5divV885tpNB7tn2rVSrVI5whnx2gyDGbPTa2LyjL-BiI8V3dOu-O0Hdsfj-S40VepYSj-z3MoVT3aSWi8kaCgYKAY4SARcSFQHGX2MiGO4jkonYBEDbfbiEZwgAsg0294		2026-01-29 18:53:30.44391+00	2026-01-29 18:53:33.838398+00	oauth	2026-01-29 18:53:33.838351+00	\N	\N	\N	\N	f
9d05a37c-45c3-4882-9f45-62de152157ac	4c3c3664-a24c-4a0d-9d7d-06f7ab0deb0c	e2377170-38e3-454d-8948-8e949bcf230a	plain	3d1b85075986a3b65cbe38d21fa4abd021eb0a241819f4754f6e4a9a9ec8eab1d7bb975fd3a794698f70421acae511a8c7e4f25f68dfc163	google	ya29.a0AUMWg_J0x50AV-fV5E4bZkiYg_Jn6YlKKxz7Q0r3GglEMSxXAQ5bYkGeArchMB3KoEVuRNfA7BNp98elhHqwiD22Cgl19tET6DS9pt4cPzr0IZEHX0hE-ewfv5t8gJt-MZz6Pz7_TQKMXFSXyAgJYiB0anZID96B12A3buUNchSlt7LE9WM0Gfkt_uRISK7z-8C0dZ8aCgYKATYSARESFQHGX2Mi0POJBkf5od5e5F0HJKbUbQ0206	1//03_PtF7YZJUoZCgYIARAAGAMSNwF-L9IrMiR-wn_TUPL-FDedQJu2r4xpYkAxrVq8ikoWMOhf9TzX8mddve1ltpUw4T2fGfrtUKM	2026-01-24 13:37:26.332351+00	2026-01-24 13:37:30.636339+00	oauth	2026-01-24 13:37:30.636291+00	\N	\N	\N	\N	f
92dabfd2-5e36-4fcd-8947-8596e19f7380	4c3c3664-a24c-4a0d-9d7d-06f7ab0deb0c	b47e1877-c872-4932-ae05-a3026fa5abeb	plain	b33bc3b70fa08bb63f765ae8870d767ec29df9d1d9a30f00d944e8a788da24896dc892b9f6ece92d1411569b23c1338a752fa8a4f0843f4d	google	ya29.a0AUMWg_KLLyBMQWZRH-70KQhHcm1hNqqDjwI5jExbUioDgW5EMe5FmKwCxIOxk6N6cW3x6q1d21S9hxr5t4UXVFODSXXZ8hU3ALwgeAUR13nlbh4u2mnPGFRNz6Z1uQbGwQhqHKuLAPOSi8NJRsVx2fWae6ZUF5YnGeRcn_YhsOF_RFwssZ84tmfjDbF93brkaIhL2R4aCgYKAawSARESFQHGX2MiwUUQO-R5gLM_o-Jnv3lMaw0206	1//03_6qWIlrt3UcCgYIARAAGAMSNwF-L9Ir5uFACEyKCZVCOyAKXZr_l95QRlluNcVEC0sC2Hhu1_H1EpBO2TxDjIj-odIS-QABWgQ	2026-01-24 13:37:40.34657+00	2026-01-24 13:37:45.322997+00	oauth	2026-01-24 13:37:45.322959+00	\N	\N	\N	\N	f
eabc9ee1-c9dd-47f5-ad86-e4e3509f7491	4c3c3664-a24c-4a0d-9d7d-06f7ab0deb0c	e3f5d6c0-c6d0-49fb-a61e-b5655319505e	plain	f783540335bf9066d0cb5fd9d0e832134de115fb63a740d5d990e914c64be36fb052b216108d8348869238928003721f286d48d2385a2a40	google	ya29.a0AUMWg_KtBxLGBtugWRz02jmJV5V_o-jtXNsr9VLqmR3rgEMhzxMhJ1nTumlmRVKFXV4I3uBMkuSMIVpT8SNo6hM50xvY3Qp8vEeBhD570UCpcaLKXNrvSURAOxWKkIwBI0a889IhY25rqEooyArWt7ziMvTXfIA9GvCBA1xPv9TOX6-GJJVboLcK4xtYfAkgnCOWmjkaCgYKAVoSARESFQHGX2Mi7AFmU5mGcH8BkvQA5uxKXw0206	1//03taJXZMrYmT5CgYIARAAGAMSNwF-L9Ir65-xHNC2gspFsOGnVVXG1-Vw6zm--ql5BtEhjl5hjtkgyNZSWkpANFjS3kLRiiaebCg	2026-01-24 13:40:35.031436+00	2026-01-24 13:40:39.1475+00	oauth	2026-01-24 13:40:39.147459+00	\N	\N	\N	\N	f
d279322f-1398-47d6-be1c-0fc717476c03	\N	eb745d20-bb1c-45dc-a8da-bb69930e4f62	s256	tDdHiJj8oiInql6-EwCkuviKHbxyr_Ne8hj8Con4JTg	google			2026-02-03 13:35:02.030493+00	2026-02-03 13:35:02.030493+00	oauth	\N	\N	\N	\N	\N	f
822780c0-11c2-4fc5-8078-7f02d76d590f	4c3c3664-a24c-4a0d-9d7d-06f7ab0deb0c	94fd96d2-79df-45bb-90be-d8593591f700	plain	01cd1123f6332e4d57a9d49a64fe95396b71b2558129b06b4e10f510980d719f2f75ca19bbe0903c6cb771d70c5af85172b06cffad1bd4ae	google	ya29.a0AUMWg_KPSrAMhd_K8GMWmOYTv1pflcxJzE5F5kK3eUfT8cnxRe1pS0RnO77FdybLAGDNnY7qv-B3h-A_eGCp7rsRRPSYWnBITHrZAW-dl2584qGkQubIypnlDtKH6oyoJ86raIzKPcVaqgMP4sJp9ffv-VxErHP2Z_nI5i5n2gbLZmj48eTqCgv7MsoJQwIaMbe0KdIaCgYKASISARESFQHGX2MiMlsS0NMn1ZsJSKrI2ptydw0206	1//03emWAszWtvkOCgYIARAAGAMSNwF-L9IrV3tf_wQVq5ZaXHxH_SYTaJjsk2LpnYKIoa1Iby-EKhV-Ip41i5kPeSKt6r-rKW2grEQ	2026-01-24 13:42:06.968274+00	2026-01-24 13:42:11.442028+00	oauth	2026-01-24 13:42:11.441983+00	\N	\N	\N	\N	f
b0e70077-62fc-4dd1-ba71-21435d84f174	\N	c62dc634-f3e8-4c13-9fb5-1ca5547ef22c	plain	68b1fcc4590b01df2951bc6e2d0a536ee6883c6c41b1403f016e6268074b54ef829aa9517feb18e883232994955314f82682c340e39d853f	google			2026-01-24 13:52:27.610851+00	2026-01-24 13:52:27.610851+00	oauth	\N	\N	\N	\N	\N	f
db72e953-a54f-4104-a3f2-0c4eaae023c1	69d7b188-4d2d-40de-9bbb-dca74b0637e2	944f8930-8836-460f-9e84-a7e286f13a40	plain	35c50e6b148b8e96352ed8bcfa5c014714836585d036ae444b3a3cb87696836ccc103c490f572d5c86b377a414dcf391104a47c163834acd	google	ya29.a0AUMWg_J_jU6OjYuxcVV4WkSTIvM6L3dJrAFZ5y2-f2gbSm5TObXOoAxfHgFi-yC_WOXrYV5dRnsIsWbUFv6PfjGNkFMahxB3sdsyEHy5dmfjbCoDiy4Azr39Vloheq5tp1xZjgXshbUb8ydR9B2tTDQzayjgdnZY_Bctt_Nt9jDvEbic5A1HWpnDYLIfZZqD_ZbNsV0aCgYKAXISARcSFQHGX2MiUDTEKgY2M9GhR5Xes0by3A0206	1//03s8-QGuNXhl5CgYIARAAGAMSNwF-L9Irvm572dNocLpCQ_dWVPP-ovD9f46qOXrE5g0_IbQHlSlPgReqfspD5JbYj7ysK3Ggxvs	2026-01-24 13:52:27.665058+00	2026-01-24 13:52:33.684737+00	oauth	2026-01-24 13:52:33.684683+00	\N	\N	\N	\N	f
7014c115-7cd1-4c32-84cb-31f572891329	69d7b188-4d2d-40de-9bbb-dca74b0637e2	b73e8fed-8721-4b83-b1b0-2c33fe237bfc	plain	a01890388fb32448de9a24310b14291f80fe71e71dd8fc50459fe8d5132f4c5e60899ac1da213178468b18708ee6a0e358b14b0146e8110d	google	ya29.A0AUMWg_LpINu_ExrhfD_rnQ704EkoeoSzKNTLmVxotkqqLlPMTseQIfqUJ1moX4-8Nc3BgUgkYv4XDlP9t05_HuQ8VDFvbq3f4QxqlnCVLz9futSl_SQRrjN9wyFeiS5f3zpodPz3MzkKlSdl2_5skz-eZTKqsq2PDl2_28ROPYfJliwVpoUjnpGtJcn3JGK9pMHDGxXNmJOX-IxoUMH5hPy0RKebMi0-BpwXmr-lU4ljWP6SmO6_OfzCRf5yRtwqg2ncpWgvgJijg9sctl61CCyCtBdkaCgYKAbISARcSFQHGX2MicT2nZDczhHVYn9PkDadHfg0291		2026-02-08 16:51:02.378669+00	2026-02-08 16:51:25.172854+00	oauth	2026-02-08 16:51:25.172795+00	\N	https://electrones.vercel.app/	\N	\N	f
31936232-4d4b-48a0-bc51-ad2e24910cfc	\N	c77c1d70-5b87-4c5e-bc6c-76b375bf22de	s256	pOb3553VInZ1mtf5QnmbQB8a4CLL09hrb78qpfYISUk	google			2026-02-09 09:29:56.573302+00	2026-02-09 09:29:56.573302+00	oauth	\N	\N	https://electrones.vercel.app/auth/callback	\N	\N	f
b2c3fe0a-da7f-4375-ba51-5ea5ed9d51c5	\N	31af7674-61a0-43ee-8718-77f0d9cab67d	s256	Fj6CBYrGRVCU71jgz7Kn-LqsW2tuIOWhY7mjH3SGfig	google			2026-02-09 09:30:06.229063+00	2026-02-09 09:30:06.229063+00	oauth	\N	\N	https://electrones.vercel.app/auth/callback	\N	\N	f
0610201a-c331-4070-9df0-96f3f3ac74fd	\N	e04a388e-f7e3-4728-a219-554c6b2eb2ff	plain	8b3a9bca2c56f290592a3087111e28daeb900515adbfc2d08376b8486497f95976feb455f9cd6a4b955fcf41f7a8fa696b24cc546bb20a0f	google			2026-01-29 14:36:28.208522+00	2026-01-29 14:36:28.208522+00	oauth	\N	\N	\N	\N	\N	f
a662ff57-373e-4999-a19f-e5f0b1f65339	69d7b188-4d2d-40de-9bbb-dca74b0637e2	7a489dd8-fb75-46f5-bd95-3af26441752a	plain	951e4739b08b21b2177c3e419a34231efcc5d89ea275f2244ef43d2d00f517091d98e0498571aca623ed7da178f0b9502a204267b15e1fda	google	ya29.A0AUMWg_LlkJSWLWqqqRVlen4BFSFBNzUtt9tw-2aJ8Migx_6-VN7CwH10DQTe-IHaDchZO5KwvlvYyV_0pP2Z5ukGRTgXLCUNFIdLewxQH-HOIoiKQI8YL2TYziaPEQVKbcaUZNfDU3gv3xgE7h15lPRmrDUqVxB8JKwxaRYc38pxpC96x1gM8av2-Xt6EDIp9fSAwm0RfU-GdaLHV7uNAhpKVgI1oE6HZ0peZfDOm8djW8agdaAJbBoOdLIoxAl6A5rulCvn6SvXS8fZ8uNi5iwIsi0aCgYKASYSARcSFQHGX2Mi_mWv2k88cTXnFxgoiYXFOg0290		2026-01-29 14:36:28.770089+00	2026-01-29 14:36:50.50974+00	oauth	2026-01-29 14:36:50.509685+00	\N	\N	\N	\N	f
f33b0f76-f075-4ba2-a0ff-c74914ce3d49	\N	8a40afd5-66ab-4747-8391-cbb77361b8f4	s256	GiKjaMt5ZEDVTZ7teS9ojN457FgHcAqTfR1ORwuNjJs	google			2026-02-14 17:10:22.92535+00	2026-02-14 17:10:22.92535+00	oauth	\N	\N	http://localhost:3000/auth/callback	\N	\N	f
\.


--
-- TOC entry 4410 (class 0 OID 16681)
-- Dependencies: 359
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
110503740968302110663	4c3c3664-a24c-4a0d-9d7d-06f7ab0deb0c	{"iss": "https://accounts.google.com", "sub": "110503740968302110663", "name": "Jorge Tomás Segarra Tamarit", "email": "tamarit@uji.es", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKHMDLHrQpCyvObnIEOh1Thyr8VXYow0vKQ3eA_OWclBoY3ng=s96-c", "full_name": "Jorge Tomás Segarra Tamarit", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKHMDLHrQpCyvObnIEOh1Thyr8VXYow0vKQ3eA_OWclBoY3ng=s96-c", "provider_id": "110503740968302110663", "custom_claims": {"hd": "uji.es"}, "email_verified": true, "phone_verified": false}	google	2026-01-24 13:06:58.054988+00	2026-01-24 13:06:58.055047+00	2026-02-19 08:50:40.171132+00	a7777958-5dad-43a0-ad62-81dafcf2aa5c
115272063562478812781	63618119-e377-4479-bf06-9a13f350c93e	{"iss": "https://accounts.google.com", "sub": "115272063562478812781", "name": "Jorge ST", "email": "jorgesegarratamarit@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ_h1IYpz7O0NQVieQ5nJzvb5h-GAikA_urL2mYoJF4p8ganA=s96-c", "full_name": "Jorge ST", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJ_h1IYpz7O0NQVieQ5nJzvb5h-GAikA_urL2mYoJF4p8ganA=s96-c", "provider_id": "115272063562478812781", "email_verified": true, "phone_verified": false}	google	2026-01-24 14:24:42.744799+00	2026-01-24 14:24:42.744858+00	2026-01-24 14:45:16.161214+00	fcc20c66-556c-4762-8c93-3b0ee1481265
115881203704463106941	69d7b188-4d2d-40de-9bbb-dca74b0637e2	{"iss": "https://accounts.google.com", "sub": "115881203704463106941", "name": "Jorge Segarra Tamarit", "email": "al118239@uji.es", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJdW4RZRB5J3oOPjBXW8kydtyz0C45cHBK9VBfxjrwK-cJU2A=s96-c", "full_name": "Jorge Segarra Tamarit", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJdW4RZRB5J3oOPjBXW8kydtyz0C45cHBK9VBfxjrwK-cJU2A=s96-c", "provider_id": "115881203704463106941", "custom_claims": {"hd": "uji.es"}, "email_verified": true, "phone_verified": false}	google	2026-01-24 13:52:33.679074+00	2026-01-24 13:52:33.679123+00	2026-02-18 14:42:39.942486+00	423814fd-0fa6-421f-ab8b-7b67506f5896
\.


--
-- TOC entry 4407 (class 0 OID 16518)
-- Dependencies: 353
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4414 (class 0 OID 16770)
-- Dependencies: 363
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
934e301c-c096-4698-a3ec-981709d7da75	2026-02-18 14:42:41.355666+00	2026-02-18 14:42:41.355666+00	oauth	e13d45d5-23be-4e8f-8b8a-9da9cc469564
fcdf1b0d-2e80-4d66-985d-7c5377bfab96	2026-02-19 08:50:41.317388+00	2026-02-19 08:50:41.317388+00	oauth	e339add4-8fd9-4ab2-a9f0-528cdcbbd6b7
\.


--
-- TOC entry 4413 (class 0 OID 16758)
-- Dependencies: 362
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- TOC entry 4412 (class 0 OID 16745)
-- Dependencies: 361
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid, last_webauthn_challenge_data) FROM stdin;
\.


--
-- TOC entry 4422 (class 0 OID 16995)
-- Dependencies: 371
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at, nonce) FROM stdin;
\.


--
-- TOC entry 4424 (class 0 OID 17068)
-- Dependencies: 373
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_client_states (id, provider_type, code_verifier, created_at) FROM stdin;
\.


--
-- TOC entry 4421 (class 0 OID 16965)
-- Dependencies: 370
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type, token_endpoint_auth_method) FROM stdin;
\.


--
-- TOC entry 4423 (class 0 OID 17028)
-- Dependencies: 372
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- TOC entry 4420 (class 0 OID 16933)
-- Dependencies: 369
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4406 (class 0 OID 16507)
-- Dependencies: 352
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	160	zrhwrtavr7m7	69d7b188-4d2d-40de-9bbb-dca74b0637e2	t	2026-02-18 14:42:41.352576+00	2026-02-18 20:53:54.548559+00	\N	934e301c-c096-4698-a3ec-981709d7da75
00000000-0000-0000-0000-000000000000	165	t66fql4ivjle	69d7b188-4d2d-40de-9bbb-dca74b0637e2	f	2026-02-18 20:53:54.563212+00	2026-02-18 20:53:54.563212+00	zrhwrtavr7m7	934e301c-c096-4698-a3ec-981709d7da75
00000000-0000-0000-0000-000000000000	167	onsvbgtk27wj	4c3c3664-a24c-4a0d-9d7d-06f7ab0deb0c	f	2026-02-19 08:50:41.294897+00	2026-02-19 08:50:41.294897+00	\N	fcdf1b0d-2e80-4d66-985d-7c5377bfab96
\.


--
-- TOC entry 4417 (class 0 OID 16812)
-- Dependencies: 366
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- TOC entry 4418 (class 0 OID 16830)
-- Dependencies: 367
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- TOC entry 4409 (class 0 OID 16533)
-- Dependencies: 355
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
20250925093508
20251007112900
20251104100000
20251111201300
20251201000000
20260115000000
20260121000000
\.


--
-- TOC entry 4411 (class 0 OID 16711)
-- Dependencies: 360
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id, refresh_token_hmac_key, refresh_token_counter, scopes) FROM stdin;
934e301c-c096-4698-a3ec-981709d7da75	69d7b188-4d2d-40de-9bbb-dca74b0637e2	2026-02-18 14:42:41.343862+00	2026-02-18 20:53:56.772324+00	\N	aal1	\N	2026-02-18 20:53:56.77223	Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36	31.4.136.137	\N	\N	\N	\N	\N
fcdf1b0d-2e80-4d66-985d-7c5377bfab96	4c3c3664-a24c-4a0d-9d7d-06f7ab0deb0c	2026-02-19 08:50:41.271831+00	2026-02-19 08:50:41.271831+00	\N	aal1	\N	\N	node	150.128.82.31	\N	\N	\N	\N	\N
\.


--
-- TOC entry 4416 (class 0 OID 16797)
-- Dependencies: 365
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4415 (class 0 OID 16788)
-- Dependencies: 364
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- TOC entry 4404 (class 0 OID 16495)
-- Dependencies: 350
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	63618119-e377-4479-bf06-9a13f350c93e	authenticated	authenticated	jorgesegarratamarit@gmail.com	\N	2026-01-24 14:24:42.751124+00	\N		\N		\N			\N	2026-01-24 14:45:16.333985+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "115272063562478812781", "name": "Jorge ST", "email": "jorgesegarratamarit@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ_h1IYpz7O0NQVieQ5nJzvb5h-GAikA_urL2mYoJF4p8ganA=s96-c", "full_name": "Jorge ST", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJ_h1IYpz7O0NQVieQ5nJzvb5h-GAikA_urL2mYoJF4p8ganA=s96-c", "provider_id": "115272063562478812781", "email_verified": true, "phone_verified": false}	\N	2026-01-24 14:24:42.732053+00	2026-01-24 14:45:16.335838+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	4c3c3664-a24c-4a0d-9d7d-06f7ab0deb0c	authenticated	authenticated	tamarit@uji.es	\N	2026-01-24 13:06:58.06737+00	\N		\N		\N			\N	2026-02-19 08:50:41.271734+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "110503740968302110663", "name": "Jorge Tomás Segarra Tamarit", "email": "tamarit@uji.es", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKHMDLHrQpCyvObnIEOh1Thyr8VXYow0vKQ3eA_OWclBoY3ng=s96-c", "full_name": "Jorge Tomás Segarra Tamarit", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKHMDLHrQpCyvObnIEOh1Thyr8VXYow0vKQ3eA_OWclBoY3ng=s96-c", "provider_id": "110503740968302110663", "custom_claims": {"hd": "uji.es"}, "email_verified": true, "phone_verified": false}	\N	2026-01-24 10:35:06.837016+00	2026-02-19 08:50:41.316813+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	69d7b188-4d2d-40de-9bbb-dca74b0637e2	authenticated	authenticated	al118239@uji.es	\N	2026-01-24 13:52:33.68301+00	\N		\N		\N			\N	2026-02-18 14:42:41.343772+00	{"provider": "google", "providers": ["google"]}	{"iss": "https://accounts.google.com", "sub": "115881203704463106941", "name": "Jorge Segarra Tamarit", "email": "al118239@uji.es", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJdW4RZRB5J3oOPjBXW8kydtyz0C45cHBK9VBfxjrwK-cJU2A=s96-c", "full_name": "Jorge Segarra Tamarit", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJdW4RZRB5J3oOPjBXW8kydtyz0C45cHBK9VBfxjrwK-cJU2A=s96-c", "provider_id": "115881203704463106941", "custom_claims": {"hd": "uji.es"}, "email_verified": true, "phone_verified": false}	\N	2026-01-24 13:52:33.668391+00	2026-02-18 20:53:54.569828+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- TOC entry 3782 (class 0 OID 45351)
-- Dependencies: 409
-- Data for Name: job; Type: TABLE DATA; Schema: cron; Owner: supabase_admin
--

COPY cron.job (jobid, schedule, command, nodename, nodeport, database, username, active, jobname) FROM stdin;
1	0 0 1 * *	SELECT award_monthly_achievements();	localhost	5432	postgres	postgres	t	reparto-logros-fin-de-mes
\.


--
-- TOC entry 3784 (class 0 OID 45370)
-- Dependencies: 411
-- Data for Name: job_run_details; Type: TABLE DATA; Schema: cron; Owner: supabase_admin
--

COPY cron.job_run_details (jobid, runid, job_pid, database, username, command, status, return_message, start_time, end_time) FROM stdin;
\.


--
-- TOC entry 4442 (class 0 OID 41748)
-- Dependencies: 405
-- Data for Name: achievements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.achievements (id, name, description, icon_name, reward_electrons, reward_product_id, created_at, category) FROM stdin;
54fcc395-ee1d-4a48-b272-fd1764aef339	Red Maestra	Acaba el mes en el equipo Top 1. ¡Vuestros circuitos han trabajado en perfecta sincronía para dominar la red eléctrica del aula!	achv_team_top1	0	434a61f5-d219-4525-9a2a-28089362c0d0	2026-02-15 21:33:18.985821+00	cooperacion
41c5a0bc-9f26-4c1a-99e8-aa1c7c57465c	Electrón Legendario	Termina el mes en la liga Leyenda (Top 10 individual). Tu voltaje está fuera de lo común y tu chispa es digna de estudio.	achv_rank_legend	0	c7a30e5e-623a-483a-9fb6-1d7faabcda3a	2026-02-15 21:33:18.985821+00	constancia
366f43eb-abfb-4e92-b331-43f127f23186	Superconductor	Acaba el mes en el Top 1 del ranking individual. ¡Has alcanzado el estado de resistencia cero y eres pura energía imparable!	achv_rank_top1	0	434a61f5-d219-4525-9a2a-28089362c0d0	2026-02-15 21:33:18.985821+00	constancia
dc7f81cd-c8dd-4feb-8a89-f0fd459ed15d	Hazte con todos	Descarga tu primera caja de alta tensión. ¿Qué habrá dentro?	achv_first_box	50	\N	2026-02-14 07:47:58.610385+00	exploracion
f9e8c90f-94f8-4d5e-b07c-a07801826286	Gran Central Eléctrica	Participa en una campaña global completada. Alimentando a toda la comunidad.	achv_crowd_global_finish	150	\N	2026-02-14 10:54:33.531219+00	cooperacion
e251ebc2-b179-4c8d-a32d-2b30369a4393	Batería Compartida	Aporta electrones a una campaña de tu equipo. ¡La energía cooperativa mueve el mundo!	achv_crowd_team_contribute	50	\N	2026-02-14 07:47:58.610385+00	cooperacion
c975f23c-12d6-4c97-8819-a9805fdbd422	Red de Distribución	Tu equipo ha completado su primera campaña. ¡Energía compartida con éxito!	achv_crowd_team_finish	100	\N	2026-02-14 10:54:33.531219+00	cooperacion
871a9554-19d3-45b4-bca0-0ecc272ce28b	¡ZAP! Electrocutado	Intenta entrar en la zona de profesores. Te has llevado un calambrazo.	achv_hacker_fail	10	\N	2026-02-14 07:47:58.610385+00	exploracion
752bd5a4-2165-476f-955d-78d46ca139d4	Tarifa Nocturna	Entra a la plataforma entre las 3:00 y las 6:00 AM. Aprovechando la energía barata, ¿eh?	achv_night_owl	50	\N	2026-02-14 07:47:58.610385+00	exploracion
561d7c44-4549-44de-8e20-55beb03093fd	Sobrecarga del Sistema	Asiste a 20 clases en total. ¡Eres una central eléctrica humana!	achv_class_20	200	\N	2026-02-14 07:47:58.610385+00	constancia
c07b51aa-8b66-481a-8fd1-67150fc0b9e4	Descarga Segura	Usa tu primera Puesta a Tierra. Más vale prevenir que electrocutarse.	achv_first_ground	50	\N	2026-02-14 07:47:58.610385+00	exploracion
42ce8911-6e0a-4457-a6b2-76ee07b78f94	Generador Global	Contribuye a un crowdfunding global. Manteniendo la red principal estable para todos.	achv_crowd_global_contribute	50	\N	2026-02-14 07:47:58.610385+00	cooperacion
389a23b6-9749-4ece-89da-00a20e4d8aa2	Ciclo Alterno Infinito	Inicia sesión 50 veces en la plataforma. Vas a la frecuencia de la red eléctrica.	achv_logins_100	50	\N	2026-02-14 07:47:58.610385+00	constancia
31bf0e30-10ae-40e0-be0b-38617343c16d	Conexión en Paralelo	Únete a un equipo por primera vez. ¡Juntos generáis mucha más potencia!	achv_team_join	50	\N	2026-02-14 07:47:58.610385+00	cooperacion
207c004d-c630-4881-be62-5c6c0a1a51d0	Corriente Continua	Asiste a 5 clases. La energía fluye sin interrupciones.	achv_class_5	100	\N	2026-02-14 07:47:58.610385+00	constancia
19e812e4-12e9-49b6-a82d-652939f77b80	Primera Chispa	Asiste a tu primera clase. ¡El circuito se ha cerrado!	achv_class_1	0	434a61f5-d219-4525-9a2a-28089362c0d0	2026-02-14 07:47:58.610385+00	constancia
0efd3330-f85e-4a92-977f-54f77d971de6	Alta Tensión	Asiste a 10 clases. Estás acumulando un voltaje peligroso.	achv_class_10	150	\N	2026-02-14 07:47:58.610385+00	constancia
1e91f64a-1b29-4b07-8562-a315ba385900	Interferencia	Has intentado escanear el QR de asistencia de otro grupo.	achv_interference	50	\N	2026-02-15 17:44:57.990715+00	exploracion
\.


--
-- TOC entry 4437 (class 0 OID 34516)
-- Dependencies: 395
-- Data for Name: exercise_library; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercise_library (id, academic_year, session, type, number, question_path, solution_path, created_at) FROM stdin;
05be9c8d-3e73-4310-90c7-547b2b6e2814	2526	Primera	C	1	2526_Primera_C1.pdf	2526_Primera_C1_Solucion.pdf	2026-02-07 16:34:53.928985+00
bd6be9cb-71bf-49a9-bba3-d666eb644962	2526	Primera	C	2	2526_Primera_C2.pdf	2526_Primera_C2_Solucion.pdf	2026-02-07 16:34:53.928985+00
d2f24897-16dd-40b4-8d1f-e81fc23d2980	2526	Primera	C	3	2526_Primera_C3.pdf	2526_Primera_C3_Solucion.pdf	2026-02-07 16:34:53.928985+00
3e89c53d-f845-4047-881e-c48c5481cea3	2526	Primera	C	4	2526_Primera_C4.pdf	2526_Primera_C4_Solucion.pdf	2026-02-07 16:34:53.928985+00
8dd11779-dfd0-4ed0-bd74-14c85774b6ae	2526	Primera	C	5	2526_Primera_C5.pdf	2526_Primera_C5_Solucion.pdf	2026-02-07 16:34:53.928985+00
b53d947d-1393-4d5a-bfb4-1bba0bd97164	2526	Primera	P	1	2526_Primera_P1.pdf	2526_Primera_P1_Solucion.pdf	2026-02-07 16:34:53.928985+00
3c7cd7f7-aa81-4a36-897a-734dba835021	2526	Primera	P	2	2526_Primera_P2.pdf	2526_Primera_P2_Solucion.pdf	2026-02-07 16:34:53.928985+00
\.


--
-- TOC entry 4439 (class 0 OID 34561)
-- Dependencies: 398
-- Data for Name: loot_tiers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.loot_tiers (id, name, probability, reward_type, includes_solution, is_active, message) FROM stdin;
1	Cuestión Estándar	750	C	f	t	Has obtenido: Cuestión Estándar
2	Problema Estándar	300	P	f	t	Has obtenido: Problema Estándar
3	Cuestión Resuelta	75	C	t	t	WoW! has obtenido: Cuestión Resuelta
4	Problema Resuelto	30	P	t	t	WoW! has obtenido: Problema Resuelto
5	Convocatoria Completa	10	FULL	f	t	LEGENDARIO! Convocatoria Completa
\.


--
-- TOC entry 4436 (class 0 OID 28863)
-- Dependencies: 393
-- Data for Name: shop_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shop_products (id, name, description, price, image_icon, category, max_per_user, stock, is_active, created_at, purchase_type) FROM stdin;
40830f5a-6d21-42d1-9d19-61da88d8c67d	Reparación de Cortocircuitos	Sesión de repaso previa al examen para aislar y reparar todos los cortocircuitos y que la energía fluya el día del examen final.	12000	FaKey	permanente	1	\N	t	2026-02-13 14:28:39.04495+00	global
c7a30e5e-623a-483a-9fb6-1d7faabcda3a	Puesta a Tierra	Permite descargar completamente una Caja de Alto Voltaje para desbloquear la solución paso a paso de un ejercicio.	300	FaPlug	key	\N	\N	t	2026-02-05 21:27:33.408655+00	individual
65b17615-9259-416a-9b69-afd709c0b3f5	Fibra Óptica	Velocidad de la luz. Obtén acceso anticipado a tus calificaciones finales 24 horas antes de la publicación oficial.	1000	FaNetworkWired	permanente	1	\N	t	2026-02-02 21:54:35.410205+00	individual
0f15f873-3fbe-4a75-9938-6ffe7914307d	Placa de Características	Inmortaliza tu legado. Una variable o componente del examen final llevará tu nombre (Ej: "Inductancia [TuApellido]").	2500	FaTag	permanente	1	\N	t	2026-02-05 21:29:04.133296+00	individual
434a61f5-d219-4525-9a2a-28089362c0d0	Caja de Alto Voltaje	Una caja sellada con energía inestable. Al abrirla puedes obtener preguntas de examen.	150	FaBoxOpen	lootbox	\N	\N	t	2026-02-02 21:54:35.410205+00	individual
71243cab-2ca9-408b-b1fd-0e6c7afef957	Fusible de Seguridad	Te proteje, eliminando tu peor calificación en un entregable.	4000	FaShieldAlt	permanente	1	\N	t	2026-02-02 21:54:35.410205+00	team
\.


--
-- TOC entry 4440 (class 0 OID 37033)
-- Dependencies: 399
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teams (id, name, description, hex_color, icon_key) FROM stdin;
tesla	Tesla	Hedereros de la visión de Nikola Tesla. Maestros de la inducción y la alta tensión que moldean el futuro de la Corriente Alterna.	#FACC15	bolt
maxwell	Maxwell	Guardianes de las ecuaciones de James Clerk Maxwell. Comprendemos la danza invisible entre campos eléctricos y magnéticos que rige el universo.	#22D3EE	wave
ayrton	Ayrton	Innovadores guiados por Hertha Ayrton. Domadores del arco eléctrico, traemos luz estable y precisión donde solo había ruido y chispas.	#F97316	fire
clarke	Clarke	Estrategas siguiendo el método de Edith Clarke. Calculadoras humanas que aseguran el equilibrio y la transmisión de potencia en la red eléctrica.	#A3E635	chart
\.


--
-- TOC entry 4425 (class 0 OID 17076)
-- Dependencies: 374
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2026-01-24 06:49:02
20211116045059	2026-01-24 06:49:02
20211116050929	2026-01-24 06:49:02
20211116051442	2026-01-24 06:49:02
20211116212300	2026-01-24 06:49:02
20211116213355	2026-01-24 06:49:02
20211116213934	2026-01-24 06:49:02
20211116214523	2026-01-24 06:49:03
20211122062447	2026-01-24 06:49:03
20211124070109	2026-01-24 06:49:03
20211202204204	2026-01-24 06:49:03
20211202204605	2026-01-24 06:49:03
20211210212804	2026-01-24 06:49:03
20211228014915	2026-01-24 06:49:04
20220107221237	2026-01-24 06:49:04
20220228202821	2026-01-24 06:49:04
20220312004840	2026-01-24 06:49:04
20220603231003	2026-01-24 06:49:04
20220603232444	2026-01-24 06:49:04
20220615214548	2026-01-24 06:49:04
20220712093339	2026-01-24 06:49:04
20220908172859	2026-01-24 06:49:04
20220916233421	2026-01-24 06:49:04
20230119133233	2026-01-24 06:49:04
20230128025114	2026-01-24 06:49:05
20230128025212	2026-01-24 06:49:05
20230227211149	2026-01-24 06:49:05
20230228184745	2026-01-24 06:49:05
20230308225145	2026-01-24 06:49:05
20230328144023	2026-01-24 06:49:05
20231018144023	2026-01-24 06:49:05
20231204144023	2026-01-24 06:49:05
20231204144024	2026-01-24 06:49:05
20231204144025	2026-01-24 06:49:05
20240108234812	2026-01-24 06:49:05
20240109165339	2026-01-24 06:49:06
20240227174441	2026-01-24 06:49:06
20240311171622	2026-01-24 06:49:06
20240321100241	2026-01-24 06:49:06
20240401105812	2026-01-24 06:49:06
20240418121054	2026-01-24 06:49:06
20240523004032	2026-01-24 06:49:07
20240618124746	2026-01-24 06:49:07
20240801235015	2026-01-24 06:49:07
20240805133720	2026-01-24 06:49:07
20240827160934	2026-01-24 06:49:07
20240919163303	2026-01-24 06:49:07
20240919163305	2026-01-24 06:49:07
20241019105805	2026-01-24 06:49:07
20241030150047	2026-01-24 06:49:08
20241108114728	2026-01-24 06:49:08
20241121104152	2026-01-24 06:49:08
20241130184212	2026-01-24 06:49:08
20241220035512	2026-01-24 06:49:08
20241220123912	2026-01-24 06:49:08
20241224161212	2026-01-24 06:49:08
20250107150512	2026-01-24 06:49:08
20250110162412	2026-01-24 06:49:08
20250123174212	2026-01-24 06:49:08
20250128220012	2026-01-24 06:49:08
20250506224012	2026-01-24 06:49:08
20250523164012	2026-01-24 06:49:09
20250714121412	2026-01-24 06:49:09
20250905041441	2026-01-24 06:49:09
20251103001201	2026-01-24 06:49:09
20251120212548	2026-02-05 14:50:48
20251120215549	2026-02-05 14:50:48
\.


--
-- TOC entry 4435 (class 0 OID 17327)
-- Dependencies: 385
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at, action_filter) FROM stdin;
\.


--
-- TOC entry 4427 (class 0 OID 17089)
-- Dependencies: 376
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
exam-content	exam-content	\N	2026-02-07 16:23:36.846051+00	2026-02-07 16:23:36.846051+00	f	f	\N	\N	\N	STANDARD
\.


--
-- TOC entry 4431 (class 0 OID 17246)
-- Dependencies: 380
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (name, type, format, created_at, updated_at, id, deleted_at) FROM stdin;
\.


--
-- TOC entry 4432 (class 0 OID 17273)
-- Dependencies: 381
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_vectors (id, type, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4426 (class 0 OID 17081)
-- Dependencies: 375
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2026-01-23 22:07:45.12112
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2026-01-23 22:07:45.139622
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2026-01-23 22:07:45.161837
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2026-01-23 22:07:45.173591
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2026-01-23 22:07:45.178269
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2026-01-23 22:07:45.189373
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2026-01-23 22:07:45.193994
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2026-01-23 22:07:45.208065
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2026-01-23 22:07:45.213396
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2026-01-23 22:07:45.218762
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2026-01-23 22:07:45.223452
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2026-01-23 22:07:45.243196
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2026-01-23 22:07:45.248216
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2026-01-23 22:07:45.25256
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2026-01-23 22:07:45.257381
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2026-01-23 22:07:45.262318
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2026-01-23 22:07:45.267323
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2026-01-23 22:07:45.274464
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2026-01-23 22:07:45.286081
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2026-01-23 22:07:45.295394
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2026-01-23 22:07:45.30016
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2026-01-23 22:07:45.304627
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2026-01-23 22:07:46.008768
44	vector-bucket-type	99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3	2026-01-23 22:07:46.053575
45	vector-buckets	049e27196d77a7cb76497a85afae669d8b230953	2026-01-23 22:07:46.058482
46	buckets-objects-grants	fedeb96d60fefd8e02ab3ded9fbde05632f84aed	2026-01-23 22:07:46.068257
47	iceberg-table-metadata	649df56855c24d8b36dd4cc1aeb8251aa9ad42c2	2026-01-23 22:07:46.073174
49	buckets-objects-grants-postgres	072b1195d0d5a2f888af6b2302a1938dd94b8b3d	2026-01-23 22:07:46.091638
2	storage-schema	f6a1fa2c93cbcd16d4e487b362e45fca157a8dbd	2026-01-23 22:07:45.143544
6	change-column-name-in-get-size	ded78e2f1b5d7e616117897e6443a925965b30d2	2026-01-23 22:07:45.183859
9	fix-search-function	af597a1b590c70519b464a4ab3be54490712796b	2026-01-23 22:07:45.198381
10	search-files-search-function	b595f05e92f7e91211af1bbfe9c6a13bb3391e16	2026-01-23 22:07:45.203315
26	objects-prefixes	215cabcb7f78121892a5a2037a09fedf9a1ae322	2026-01-23 22:07:45.309241
27	search-v2	859ba38092ac96eb3964d83bf53ccc0b141663a6	2026-01-23 22:07:45.319884
28	object-bucket-name-sorting	c73a2b5b5d4041e39705814fd3a1b95502d38ce4	2026-01-23 22:07:45.960025
29	create-prefixes	ad2c1207f76703d11a9f9007f821620017a66c21	2026-01-23 22:07:45.964937
30	update-object-levels	2be814ff05c8252fdfdc7cfb4b7f5c7e17f0bed6	2026-01-23 22:07:45.969797
31	objects-level-index	b40367c14c3440ec75f19bbce2d71e914ddd3da0	2026-01-23 22:07:45.97678
32	backward-compatible-index-on-objects	e0c37182b0f7aee3efd823298fb3c76f1042c0f7	2026-01-23 22:07:45.983556
33	backward-compatible-index-on-prefixes	b480e99ed951e0900f033ec4eb34b5bdcb4e3d49	2026-01-23 22:07:45.989918
34	optimize-search-function-v1	ca80a3dc7bfef894df17108785ce29a7fc8ee456	2026-01-23 22:07:45.991699
35	add-insert-trigger-prefixes	458fe0ffd07ec53f5e3ce9df51bfdf4861929ccc	2026-01-23 22:07:45.997229
36	optimise-existing-functions	6ae5fca6af5c55abe95369cd4f93985d1814ca8f	2026-01-23 22:07:46.00246
38	iceberg-catalog-flag-on-buckets	02716b81ceec9705aed84aa1501657095b32e5c5	2026-01-23 22:07:46.013976
39	add-search-v2-sort-support	6706c5f2928846abee18461279799ad12b279b78	2026-01-23 22:07:46.022481
40	fix-prefix-race-conditions-optimized	7ad69982ae2d372b21f48fc4829ae9752c518f6b	2026-01-23 22:07:46.028219
41	add-object-level-update-trigger	07fcf1a22165849b7a029deed059ffcde08d1ae0	2026-01-23 22:07:46.037106
42	rollback-prefix-triggers	771479077764adc09e2ea2043eb627503c034cd4	2026-01-23 22:07:46.042696
43	fix-object-level	84b35d6caca9d937478ad8a797491f38b8c2979f	2026-01-23 22:07:46.048574
48	iceberg-catalog-ids	e0e8b460c609b9999ccd0df9ad14294613eed939	2026-01-23 22:07:46.077294
50	search-v2-optimised	6323ac4f850aa14e7387eb32102869578b5bd478	2026-02-10 08:40:27.910443
51	index-backward-compatible-search	2ee395d433f76e38bcd3856debaf6e0e5b674011	2026-02-10 08:40:27.951484
52	drop-not-used-indexes-and-functions	5cc44c8696749ac11dd0dc37f2a3802075f3a171	2026-02-10 08:40:27.9529
53	drop-index-lower-name	d0cb18777d9e2a98ebe0bc5cc7a42e57ebe41854	2026-02-10 08:40:27.995072
54	drop-index-object-level	6289e048b1472da17c31a7eba1ded625a6457e67	2026-02-10 08:40:27.997163
55	prevent-direct-deletes	262a4798d5e0f2e7c8970232e03ce8be695d5819	2026-02-10 08:40:27.998599
56	fix-optimized-search-function	cb58526ebc23048049fd5bf2fd148d18b04a2073	2026-02-10 08:40:28.00676
\.


--
-- TOC entry 4428 (class 0 OID 17099)
-- Dependencies: 377
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
85223b1d-2c29-497c-bb9a-44cacc2beca1	exam-content	2526_Primera_C5.pdf	\N	2026-02-07 16:23:53.996944+00	2026-02-07 16:23:53.996944+00	2026-02-07 16:23:53.996944+00	{"eTag": "\\"f906be7feac158d8eb3b42e8164cc268-1\\"", "size": 344585, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:54.000Z", "contentLength": 344585, "httpStatusCode": 200}	2adb0c74-4fe2-463a-8140-e0bec736649a	\N	\N
0c98823b-c45f-4096-9484-e5919d435056	exam-content	2526_Primera_C4_Solucion.pdf	\N	2026-02-07 16:23:54.03252+00	2026-02-07 16:23:54.03252+00	2026-02-07 16:23:54.03252+00	{"eTag": "\\"7397836c20b8fa25db160d7723c7f5cc-1\\"", "size": 533707, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:54.000Z", "contentLength": 533707, "httpStatusCode": 200}	dbce4b70-f668-467b-9a72-a53b1d75e17f	\N	\N
743b26e8-38d6-4973-89b6-9a5fd0253811	exam-content	2526_Primera_C3.pdf	\N	2026-02-07 16:23:54.061696+00	2026-02-07 16:23:54.061696+00	2026-02-07 16:23:54.061696+00	{"eTag": "\\"7048172a7b09aeb56bcb3a37615e56a1-1\\"", "size": 505704, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:54.000Z", "contentLength": 505704, "httpStatusCode": 200}	024a5ec6-88ff-4c62-824d-d0350cf53d0e	\N	\N
35480b10-701a-4197-84d0-edea19642f1d	exam-content	2526_Primera_C3_Solucion.pdf	\N	2026-02-07 16:23:54.074327+00	2026-02-07 16:23:54.074327+00	2026-02-07 16:23:54.074327+00	{"eTag": "\\"2f6f1d77b7a4b0cd4d18fab4aca642bd-1\\"", "size": 786369, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:54.000Z", "contentLength": 786369, "httpStatusCode": 200}	fc7f89b3-8ba7-4eb7-8e25-47bf7684d3ae	\N	\N
24ec5879-ee00-4960-92f4-ed230107576e	exam-content	2526_Primera_C2_Solucion.pdf	\N	2026-02-07 16:23:54.159485+00	2026-02-07 16:23:54.159485+00	2026-02-07 16:23:54.159485+00	{"eTag": "\\"b4bd21c6077eb365618a27b8c8f8db61-1\\"", "size": 549149, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:54.000Z", "contentLength": 549149, "httpStatusCode": 200}	ade575a0-6774-4706-bd8a-75e47e5b17ca	\N	\N
a125fd1a-1afa-4f29-8a2e-9bf37729988a	exam-content	2526_Primera_C2.pdf	\N	2026-02-07 16:23:54.16903+00	2026-02-07 16:23:54.16903+00	2026-02-07 16:23:54.16903+00	{"eTag": "\\"9d345fb5785ff944c0ce57f411110bf2-1\\"", "size": 298416, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:54.000Z", "contentLength": 298416, "httpStatusCode": 200}	d7843ba1-f631-4afe-960e-da2b21586af0	\N	\N
1dc4c7cf-9e3f-41cb-a7d1-fd9680b0d47f	exam-content	2526_Primera_C1_Solucion.pdf	\N	2026-02-07 16:23:54.116241+00	2026-02-07 16:23:54.116241+00	2026-02-07 16:23:54.116241+00	{"eTag": "\\"65bcfc86ee51c4b35d3ecdaaa841f900-1\\"", "size": 544374, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:54.000Z", "contentLength": 544374, "httpStatusCode": 200}	5973596a-4e76-4b7f-ab3b-b34a5bba8a7c	\N	\N
c7db1dd8-c4f1-43a1-a29a-0ae11320b82b	exam-content	2526_Primera_C5_Solucion.pdf	\N	2026-02-07 16:23:54.243284+00	2026-02-07 16:23:54.243284+00	2026-02-07 16:23:54.243284+00	{"eTag": "\\"a73739827007f96bac1025be877ed8b6-1\\"", "size": 690321, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:54.000Z", "contentLength": 690321, "httpStatusCode": 200}	f24cca55-edbe-4f43-8f5c-277e2c7b6a60	\N	\N
765b7361-fa0a-43bb-a8b2-ae8d54bb652d	exam-content	2526_Primera_C4.pdf	\N	2026-02-07 16:23:54.970026+00	2026-02-07 16:23:54.970026+00	2026-02-07 16:23:54.970026+00	{"eTag": "\\"e08eb1b2fca1e7baed2b06ea1f34aa47-1\\"", "size": 264291, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:55.000Z", "contentLength": 264291, "httpStatusCode": 200}	7f7bee9c-2ed8-401a-9543-ced6d4cb5e2e	\N	\N
a5db769a-c11b-4fd9-973a-6b2a42c2c015	exam-content	2526_Primera_C1.pdf	\N	2026-02-07 16:23:55.002191+00	2026-02-07 16:23:55.002191+00	2026-02-07 16:23:55.002191+00	{"eTag": "\\"76c8bcfe6273c4902fd226011b0a803a-1\\"", "size": 198735, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:55.000Z", "contentLength": 198735, "httpStatusCode": 200}	d61c1bef-487d-4bd7-9c3c-741fdd1e2229	\N	\N
aff907b5-941d-4563-9c1a-cfc559ce2c06	exam-content	2526_Primera_P1_Solucion.pdf	\N	2026-02-07 16:23:55.699237+00	2026-02-07 16:23:55.699237+00	2026-02-07 16:23:55.699237+00	{"eTag": "\\"95b510b906746c95f957581ebc604e55-1\\"", "size": 233026, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:56.000Z", "contentLength": 233026, "httpStatusCode": 200}	dc18288f-1de5-4dcb-8c25-f6831f5a687e	\N	\N
abe18117-5ae0-46f2-9171-fab17bf7f8d4	exam-content	2526_Primera_P2.pdf	\N	2026-02-07 16:23:55.723991+00	2026-02-07 16:23:55.723991+00	2026-02-07 16:23:55.723991+00	{"eTag": "\\"3321c3642457cef10f6e01f84f33c296-1\\"", "size": 587383, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:56.000Z", "contentLength": 587383, "httpStatusCode": 200}	6e79022d-f41f-4e6e-a6d7-a7d067dd5944	\N	\N
98fe8784-b90e-4d88-85fa-88afef98471b	exam-content	2526_Primera_P2_Solucion.pdf	\N	2026-02-07 16:23:55.846196+00	2026-02-07 16:23:55.846196+00	2026-02-07 16:23:55.846196+00	{"eTag": "\\"b7084caffd41545d188a208787612500-1\\"", "size": 748288, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:56.000Z", "contentLength": 748288, "httpStatusCode": 200}	6ee0f8b5-d6cf-4a65-b1bc-9c3e95ac2113	\N	\N
f0d4a546-6b72-4c0b-99dd-080d2b0e50da	exam-content	2526_Primera_P1.pdf	\N	2026-02-07 16:23:56.087216+00	2026-02-07 16:23:56.087216+00	2026-02-07 16:23:56.087216+00	{"eTag": "\\"71dbb0d8990370911fb9d7ba89afeed1-1\\"", "size": 341841, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2026-02-07T16:23:56.000Z", "contentLength": 341841, "httpStatusCode": 200}	d04a3c17-5753-4e7b-94c0-83efae2dcf68	\N	\N
\.


--
-- TOC entry 4429 (class 0 OID 17149)
-- Dependencies: 378
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- TOC entry 4430 (class 0 OID 17163)
-- Dependencies: 379
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- TOC entry 4433 (class 0 OID 17283)
-- Dependencies: 382
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.vector_indexes (id, name, bucket_id, data_type, dimension, distance_metric, metadata_configuration, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3781 (class 0 OID 16608)
-- Dependencies: 356
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4668 (class 0 OID 0)
-- Dependencies: 351
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 167, true);


--
-- TOC entry 4669 (class 0 OID 0)
-- Dependencies: 408
-- Name: jobid_seq; Type: SEQUENCE SET; Schema: cron; Owner: supabase_admin
--

SELECT pg_catalog.setval('cron.jobid_seq', 1, true);


--
-- TOC entry 4670 (class 0 OID 0)
-- Dependencies: 410
-- Name: runid_seq; Type: SEQUENCE SET; Schema: cron; Owner: supabase_admin
--

SELECT pg_catalog.setval('cron.runid_seq', 1, false);


--
-- TOC entry 4671 (class 0 OID 0)
-- Dependencies: 401
-- Name: crowdfunding_contributions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.crowdfunding_contributions_id_seq', 21, true);


--
-- TOC entry 4672 (class 0 OID 0)
-- Dependencies: 397
-- Name: loot_tiers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loot_tiers_id_seq', 5, true);


--
-- TOC entry 4673 (class 0 OID 0)
-- Dependencies: 384
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- TOC entry 3988 (class 2606 OID 16783)
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- TOC entry 3957 (class 2606 OID 16531)
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- TOC entry 4011 (class 2606 OID 16889)
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- TOC entry 3966 (class 2606 OID 16907)
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- TOC entry 3968 (class 2606 OID 16917)
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- TOC entry 3955 (class 2606 OID 16524)
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- TOC entry 3990 (class 2606 OID 16776)
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- TOC entry 3986 (class 2606 OID 16764)
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- TOC entry 3978 (class 2606 OID 16957)
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- TOC entry 3980 (class 2606 OID 16751)
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- TOC entry 4024 (class 2606 OID 17016)
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- TOC entry 4026 (class 2606 OID 17014)
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- TOC entry 4028 (class 2606 OID 17012)
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- TOC entry 4038 (class 2606 OID 17074)
-- Name: oauth_client_states oauth_client_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_client_states
    ADD CONSTRAINT oauth_client_states_pkey PRIMARY KEY (id);


--
-- TOC entry 4021 (class 2606 OID 16976)
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- TOC entry 4032 (class 2606 OID 17038)
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- TOC entry 4034 (class 2606 OID 17040)
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- TOC entry 4015 (class 2606 OID 16942)
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3949 (class 2606 OID 16514)
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3952 (class 2606 OID 16694)
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- TOC entry 4000 (class 2606 OID 16823)
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- TOC entry 4002 (class 2606 OID 16821)
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- TOC entry 4007 (class 2606 OID 16837)
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- TOC entry 3960 (class 2606 OID 16537)
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- TOC entry 3973 (class 2606 OID 16715)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3997 (class 2606 OID 16804)
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- TOC entry 3992 (class 2606 OID 16795)
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- TOC entry 3942 (class 2606 OID 16877)
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- TOC entry 3944 (class 2606 OID 16501)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4112 (class 2606 OID 41757)
-- Name: achievements achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT achievements_pkey PRIMARY KEY (id);


--
-- TOC entry 4082 (class 2606 OID 24373)
-- Name: attendance attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);


--
-- TOC entry 4084 (class 2606 OID 24375)
-- Name: attendance attendance_user_id_session_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_user_id_session_id_key UNIQUE (user_id, session_id);


--
-- TOC entry 4080 (class 2606 OID 24364)
-- Name: class_sessions class_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_sessions
    ADD CONSTRAINT class_sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 4102 (class 2606 OID 39373)
-- Name: crowdfunding_campaigns crowdfunding_campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crowdfunding_campaigns
    ADD CONSTRAINT crowdfunding_campaigns_pkey PRIMARY KEY (id);


--
-- TOC entry 4104 (class 2606 OID 39375)
-- Name: crowdfunding_campaigns crowdfunding_campaigns_product_id_team_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crowdfunding_campaigns
    ADD CONSTRAINT crowdfunding_campaigns_product_id_team_id_key UNIQUE (product_id, team_id);


--
-- TOC entry 4108 (class 2606 OID 40549)
-- Name: crowdfunding_claims crowdfunding_claims_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crowdfunding_claims
    ADD CONSTRAINT crowdfunding_claims_pkey PRIMARY KEY (campaign_id, user_id);


--
-- TOC entry 4106 (class 2606 OID 39395)
-- Name: crowdfunding_contributions crowdfunding_contributions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crowdfunding_contributions
    ADD CONSTRAINT crowdfunding_contributions_pkey PRIMARY KEY (id);


--
-- TOC entry 4090 (class 2606 OID 34526)
-- Name: exercise_library exercise_library_academic_year_session_type_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_library
    ADD CONSTRAINT exercise_library_academic_year_session_type_number_key UNIQUE (academic_year, session, type, number);


--
-- TOC entry 4092 (class 2606 OID 34524)
-- Name: exercise_library exercise_library_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_library
    ADD CONSTRAINT exercise_library_pkey PRIMARY KEY (id);


--
-- TOC entry 4098 (class 2606 OID 34570)
-- Name: loot_tiers loot_tiers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loot_tiers
    ADD CONSTRAINT loot_tiers_pkey PRIMARY KEY (id);


--
-- TOC entry 4110 (class 2606 OID 41720)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- TOC entry 4076 (class 2606 OID 17499)
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 4086 (class 2606 OID 28874)
-- Name: shop_products shop_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_products
    ADD CONSTRAINT shop_products_pkey PRIMARY KEY (id);


--
-- TOC entry 4118 (class 2606 OID 41935)
-- Name: site_metrics site_metrics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site_metrics
    ADD CONSTRAINT site_metrics_pkey PRIMARY KEY (user_id, page_path, visit_date);


--
-- TOC entry 4100 (class 2606 OID 37039)
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- TOC entry 4078 (class 2606 OID 17517)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- TOC entry 4114 (class 2606 OID 41770)
-- Name: user_achievements user_achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_pkey PRIMARY KEY (id);


--
-- TOC entry 4116 (class 2606 OID 41772)
-- Name: user_achievements user_achievements_user_id_achievement_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_user_id_achievement_id_key UNIQUE (user_id, achievement_id);


--
-- TOC entry 4088 (class 2606 OID 28882)
-- Name: user_inventory user_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT user_inventory_pkey PRIMARY KEY (id);


--
-- TOC entry 4094 (class 2606 OID 34534)
-- Name: user_unlocks user_unlocks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_unlocks
    ADD CONSTRAINT user_unlocks_pkey PRIMARY KEY (id);


--
-- TOC entry 4096 (class 2606 OID 34536)
-- Name: user_unlocks user_unlocks_user_id_exercise_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_unlocks
    ADD CONSTRAINT user_unlocks_user_id_exercise_id_key UNIQUE (user_id, exercise_id);


--
-- TOC entry 4073 (class 2606 OID 17481)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4069 (class 2606 OID 17335)
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- TOC entry 4040 (class 2606 OID 17080)
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- TOC entry 4060 (class 2606 OID 17306)
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- TOC entry 4047 (class 2606 OID 17097)
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- TOC entry 4063 (class 2606 OID 17282)
-- Name: buckets_vectors buckets_vectors_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_vectors
    ADD CONSTRAINT buckets_vectors_pkey PRIMARY KEY (id);


--
-- TOC entry 4042 (class 2606 OID 17088)
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- TOC entry 4044 (class 2606 OID 17086)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4053 (class 2606 OID 17109)
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- TOC entry 4058 (class 2606 OID 17172)
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- TOC entry 4056 (class 2606 OID 17157)
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- TOC entry 4066 (class 2606 OID 17292)
-- Name: vector_indexes vector_indexes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_pkey PRIMARY KEY (id);


--
-- TOC entry 3958 (class 1259 OID 16532)
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- TOC entry 3932 (class 1259 OID 16704)
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3933 (class 1259 OID 16706)
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3934 (class 1259 OID 16707)
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3976 (class 1259 OID 16785)
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- TOC entry 4009 (class 1259 OID 16893)
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- TOC entry 3964 (class 1259 OID 16873)
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- TOC entry 4674 (class 0 OID 0)
-- Dependencies: 3964
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- TOC entry 3969 (class 1259 OID 16701)
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- TOC entry 4012 (class 1259 OID 16890)
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- TOC entry 4036 (class 1259 OID 17075)
-- Name: idx_oauth_client_states_created_at; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_oauth_client_states_created_at ON auth.oauth_client_states USING btree (created_at);


--
-- TOC entry 4013 (class 1259 OID 16891)
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- TOC entry 3984 (class 1259 OID 16896)
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- TOC entry 3981 (class 1259 OID 16757)
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- TOC entry 3982 (class 1259 OID 16902)
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- TOC entry 4022 (class 1259 OID 17027)
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- TOC entry 4019 (class 1259 OID 16980)
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- TOC entry 4029 (class 1259 OID 17053)
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- TOC entry 4030 (class 1259 OID 17051)
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- TOC entry 4035 (class 1259 OID 17052)
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- TOC entry 4016 (class 1259 OID 16949)
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- TOC entry 4017 (class 1259 OID 16948)
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- TOC entry 4018 (class 1259 OID 16950)
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- TOC entry 3935 (class 1259 OID 16708)
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3936 (class 1259 OID 16705)
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3945 (class 1259 OID 16515)
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- TOC entry 3946 (class 1259 OID 16516)
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- TOC entry 3947 (class 1259 OID 16700)
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- TOC entry 3950 (class 1259 OID 16787)
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- TOC entry 3953 (class 1259 OID 16892)
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- TOC entry 4003 (class 1259 OID 16829)
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- TOC entry 4004 (class 1259 OID 16894)
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- TOC entry 4005 (class 1259 OID 16844)
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- TOC entry 4008 (class 1259 OID 16843)
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- TOC entry 3970 (class 1259 OID 16895)
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- TOC entry 3971 (class 1259 OID 17065)
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- TOC entry 3974 (class 1259 OID 16786)
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- TOC entry 3995 (class 1259 OID 16811)
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- TOC entry 3998 (class 1259 OID 16810)
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- TOC entry 3993 (class 1259 OID 16796)
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- TOC entry 3994 (class 1259 OID 16958)
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- TOC entry 3983 (class 1259 OID 16955)
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- TOC entry 3975 (class 1259 OID 16784)
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- TOC entry 3937 (class 1259 OID 16864)
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- TOC entry 4675 (class 0 OID 0)
-- Dependencies: 3937
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- TOC entry 3938 (class 1259 OID 16702)
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- TOC entry 3939 (class 1259 OID 16505)
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- TOC entry 3940 (class 1259 OID 16919)
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- TOC entry 4074 (class 1259 OID 37031)
-- Name: idx_profiles_team; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_profiles_team ON public.profiles USING btree (team);


--
-- TOC entry 4067 (class 1259 OID 17482)
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- TOC entry 4071 (class 1259 OID 17483)
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4070 (class 1259 OID 31115)
-- Name: subscription_subscription_id_entity_filters_action_filter_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_action_filter_key ON realtime.subscription USING btree (subscription_id, entity, filters, action_filter);


--
-- TOC entry 4045 (class 1259 OID 17098)
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- TOC entry 4048 (class 1259 OID 17115)
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- TOC entry 4061 (class 1259 OID 17307)
-- Name: buckets_analytics_unique_name_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX buckets_analytics_unique_name_idx ON storage.buckets_analytics USING btree (name) WHERE (deleted_at IS NULL);


--
-- TOC entry 4054 (class 1259 OID 17183)
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- TOC entry 4049 (class 1259 OID 17148)
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- TOC entry 4050 (class 1259 OID 37057)
-- Name: idx_objects_bucket_id_name_lower; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name_lower ON storage.objects USING btree (bucket_id, lower(name) COLLATE "C");


--
-- TOC entry 4051 (class 1259 OID 17116)
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- TOC entry 4064 (class 1259 OID 17298)
-- Name: vector_indexes_name_bucket_id_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX vector_indexes_name_bucket_id_idx ON storage.vector_indexes USING btree (name, bucket_id);


--
-- TOC entry 4168 (class 2620 OID 17684)
-- Name: users on_auth_user_created; Type: TRIGGER; Schema: auth; Owner: supabase_auth_admin
--

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


--
-- TOC entry 4182 (class 2620 OID 41811)
-- Name: user_achievements on_achievement_unlocked; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER on_achievement_unlocked AFTER INSERT ON public.user_achievements FOR EACH ROW EXECUTE FUNCTION public.grant_achievement_rewards();


--
-- TOC entry 4177 (class 2620 OID 24390)
-- Name: attendance on_attendance_added; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER on_attendance_added AFTER INSERT ON public.attendance FOR EACH ROW EXECUTE FUNCTION public.handle_attendance_points();


--
-- TOC entry 4174 (class 2620 OID 41795)
-- Name: profiles on_attendance_count_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER on_attendance_count_update AFTER UPDATE OF attendance_count ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.check_attendance_achievements();


--
-- TOC entry 4179 (class 2620 OID 41741)
-- Name: crowdfunding_campaigns on_crowdfunding_completed; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER on_crowdfunding_completed AFTER UPDATE ON public.crowdfunding_campaigns FOR EACH ROW EXECUTE FUNCTION public.handle_completed_crowdfunding();


--
-- TOC entry 4176 (class 2620 OID 17526)
-- Name: transactions on_transaction_added; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER on_transaction_added AFTER INSERT ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.update_balance();


--
-- TOC entry 4183 (class 2620 OID 41956)
-- Name: site_metrics trigger_100_days_logins; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_100_days_logins AFTER INSERT ON public.site_metrics FOR EACH ROW EXECUTE FUNCTION public.handle_100_days_achievement();


--
-- TOC entry 4178 (class 2620 OID 41876)
-- Name: user_inventory trigger_check_item_usage; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_check_item_usage AFTER UPDATE ON public.user_inventory FOR EACH ROW EXECUTE FUNCTION public.handle_item_consumption_achievements();


--
-- TOC entry 4180 (class 2620 OID 41900)
-- Name: crowdfunding_campaigns trigger_on_campaign_completed; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_on_campaign_completed AFTER UPDATE ON public.crowdfunding_campaigns FOR EACH ROW EXECUTE FUNCTION public.handle_crowdfunding_completion_achievements();


--
-- TOC entry 4181 (class 2620 OID 41897)
-- Name: crowdfunding_contributions trigger_on_crowdfunding_contribution; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_on_crowdfunding_contribution AFTER INSERT ON public.crowdfunding_contributions FOR EACH ROW EXECUTE FUNCTION public.handle_crowdfunding_contribution_achievements();


--
-- TOC entry 4175 (class 2620 OID 41917)
-- Name: profiles trigger_on_team_join; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_on_team_join AFTER UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_team_join_achievement();


--
-- TOC entry 4173 (class 2620 OID 17340)
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- TOC entry 4169 (class 2620 OID 17239)
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- TOC entry 4170 (class 2620 OID 37059)
-- Name: buckets protect_buckets_delete; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER protect_buckets_delete BEFORE DELETE ON storage.buckets FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- TOC entry 4171 (class 2620 OID 37060)
-- Name: objects protect_objects_delete; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER protect_objects_delete BEFORE DELETE ON storage.objects FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- TOC entry 4172 (class 2620 OID 17136)
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- TOC entry 4126 (class 2606 OID 16688)
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4131 (class 2606 OID 16777)
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- TOC entry 4130 (class 2606 OID 16765)
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- TOC entry 4129 (class 2606 OID 16752)
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4137 (class 2606 OID 17017)
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- TOC entry 4138 (class 2606 OID 17022)
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4139 (class 2606 OID 17046)
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- TOC entry 4140 (class 2606 OID 17041)
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4136 (class 2606 OID 16943)
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4125 (class 2606 OID 16721)
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- TOC entry 4133 (class 2606 OID 16824)
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- TOC entry 4134 (class 2606 OID 16897)
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- TOC entry 4135 (class 2606 OID 16838)
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- TOC entry 4127 (class 2606 OID 17060)
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- TOC entry 4128 (class 2606 OID 16716)
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4132 (class 2606 OID 16805)
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- TOC entry 4164 (class 2606 OID 41758)
-- Name: achievements achievements_reward_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT achievements_reward_product_id_fkey FOREIGN KEY (reward_product_id) REFERENCES public.shop_products(id) ON DELETE SET NULL;


--
-- TOC entry 4150 (class 2606 OID 24381)
-- Name: attendance attendance_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.class_sessions(id);


--
-- TOC entry 4151 (class 2606 OID 24376)
-- Name: attendance attendance_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);


--
-- TOC entry 4149 (class 2606 OID 24411)
-- Name: class_sessions class_sessions_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_sessions
    ADD CONSTRAINT class_sessions_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES auth.users(id);


--
-- TOC entry 4156 (class 2606 OID 39376)
-- Name: crowdfunding_campaigns crowdfunding_campaigns_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crowdfunding_campaigns
    ADD CONSTRAINT crowdfunding_campaigns_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.shop_products(id) ON DELETE CASCADE;


--
-- TOC entry 4157 (class 2606 OID 39381)
-- Name: crowdfunding_campaigns crowdfunding_campaigns_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crowdfunding_campaigns
    ADD CONSTRAINT crowdfunding_campaigns_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- TOC entry 4161 (class 2606 OID 40550)
-- Name: crowdfunding_claims crowdfunding_claims_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crowdfunding_claims
    ADD CONSTRAINT crowdfunding_claims_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.crowdfunding_campaigns(id) ON DELETE CASCADE;


--
-- TOC entry 4162 (class 2606 OID 40555)
-- Name: crowdfunding_claims crowdfunding_claims_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crowdfunding_claims
    ADD CONSTRAINT crowdfunding_claims_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4158 (class 2606 OID 39396)
-- Name: crowdfunding_contributions crowdfunding_contributions_campaign_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crowdfunding_contributions
    ADD CONSTRAINT crowdfunding_contributions_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.crowdfunding_campaigns(id) ON DELETE CASCADE;


--
-- TOC entry 4159 (class 2606 OID 39401)
-- Name: crowdfunding_contributions crowdfunding_contributions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crowdfunding_contributions
    ADD CONSTRAINT crowdfunding_contributions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4160 (class 2606 OID 39411)
-- Name: crowdfunding_contributions crowdfunding_contributions_user_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crowdfunding_contributions
    ADD CONSTRAINT crowdfunding_contributions_user_team_id_fkey FOREIGN KEY (user_team_id) REFERENCES public.teams(id);


--
-- TOC entry 4146 (class 2606 OID 37041)
-- Name: profiles fk_profiles_team; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT fk_profiles_team FOREIGN KEY (team) REFERENCES public.teams(id) ON DELETE SET NULL;


--
-- TOC entry 4163 (class 2606 OID 41721)
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4147 (class 2606 OID 17500)
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4167 (class 2606 OID 41936)
-- Name: site_metrics site_metrics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.site_metrics
    ADD CONSTRAINT site_metrics_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4148 (class 2606 OID 17518)
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id);


--
-- TOC entry 4165 (class 2606 OID 41778)
-- Name: user_achievements user_achievements_achievement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_achievement_id_fkey FOREIGN KEY (achievement_id) REFERENCES public.achievements(id) ON DELETE CASCADE;


--
-- TOC entry 4166 (class 2606 OID 41773)
-- Name: user_achievements user_achievements_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- TOC entry 4152 (class 2606 OID 28888)
-- Name: user_inventory user_inventory_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT user_inventory_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.shop_products(id) ON DELETE CASCADE;


--
-- TOC entry 4153 (class 2606 OID 28883)
-- Name: user_inventory user_inventory_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT user_inventory_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- TOC entry 4154 (class 2606 OID 34542)
-- Name: user_unlocks user_unlocks_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_unlocks
    ADD CONSTRAINT user_unlocks_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise_library(id) ON DELETE CASCADE;


--
-- TOC entry 4155 (class 2606 OID 34537)
-- Name: user_unlocks user_unlocks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_unlocks
    ADD CONSTRAINT user_unlocks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- TOC entry 4141 (class 2606 OID 17110)
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 4142 (class 2606 OID 17158)
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 4143 (class 2606 OID 17178)
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 4144 (class 2606 OID 17173)
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- TOC entry 4145 (class 2606 OID 17293)
-- Name: vector_indexes vector_indexes_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets_vectors(id);


--
-- TOC entry 4335 (class 0 OID 16525)
-- Dependencies: 354
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4346 (class 0 OID 16883)
-- Dependencies: 368
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4337 (class 0 OID 16681)
-- Dependencies: 359
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4334 (class 0 OID 16518)
-- Dependencies: 353
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4341 (class 0 OID 16770)
-- Dependencies: 363
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4340 (class 0 OID 16758)
-- Dependencies: 362
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4339 (class 0 OID 16745)
-- Dependencies: 361
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4347 (class 0 OID 16933)
-- Dependencies: 369
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4333 (class 0 OID 16507)
-- Dependencies: 352
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4344 (class 0 OID 16812)
-- Dependencies: 366
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4345 (class 0 OID 16830)
-- Dependencies: 367
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4336 (class 0 OID 16533)
-- Dependencies: 355
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4338 (class 0 OID 16711)
-- Dependencies: 360
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4343 (class 0 OID 16797)
-- Dependencies: 365
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4342 (class 0 OID 16788)
-- Dependencies: 364
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4332 (class 0 OID 16495)
-- Dependencies: 350
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4376 (class 3256 OID 17524)
-- Name: transactions Admin gestiona todo; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admin gestiona todo" ON public.transactions USING ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));


--
-- TOC entry 4393 (class 3256 OID 24418)
-- Name: class_sessions Admins editan sus sesiones; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins editan sus sesiones" ON public.class_sessions FOR UPDATE USING (((auth.uid() = teacher_id) AND (EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text))))));


--
-- TOC entry 4402 (class 3256 OID 47702)
-- Name: user_inventory Admins pueden ver todo el inventario; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins pueden ver todo el inventario" ON public.user_inventory FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));


--
-- TOC entry 4401 (class 3256 OID 45342)
-- Name: user_achievements Admins y profesores pueden ver todos los user_achievements; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins y profesores pueden ver todos los user_achievements" ON public.user_achievements FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));


--
-- TOC entry 4378 (class 3256 OID 24365)
-- Name: class_sessions Alumnos ven sesiones activas; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Alumnos ven sesiones activas" ON public.class_sessions FOR SELECT USING ((is_active = true));


--
-- TOC entry 4388 (class 3256 OID 24387)
-- Name: attendance Alumnos ven sus asistencias; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Alumnos ven sus asistencias" ON public.attendance FOR SELECT USING ((auth.uid() = user_id));


--
-- TOC entry 4398 (class 3256 OID 34571)
-- Name: loot_tiers Anyone can view loot tiers; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view loot tiers" ON public.loot_tiers FOR SELECT USING (true);


--
-- TOC entry 4380 (class 3256 OID 39386)
-- Name: crowdfunding_campaigns Everyone can view campaigns; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Everyone can view campaigns" ON public.crowdfunding_campaigns FOR SELECT USING (true);


--
-- TOC entry 4381 (class 3256 OID 39406)
-- Name: crowdfunding_contributions Everyone can view contributions; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Everyone can view contributions" ON public.crowdfunding_contributions FOR SELECT USING (true);


--
-- TOC entry 4391 (class 3256 OID 24416)
-- Name: class_sessions Lectura pública de sesiones; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Lectura pública de sesiones" ON public.class_sessions FOR SELECT USING (true);


--
-- TOC entry 4387 (class 3256 OID 41783)
-- Name: user_achievements Los usuarios pueden ver sus propios logros desbloqueados; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Los usuarios pueden ver sus propios logros desbloqueados" ON public.user_achievements FOR SELECT USING ((auth.uid() = user_id));


--
-- TOC entry 4382 (class 3256 OID 40565)
-- Name: crowdfunding_claims Los usuarios solo pueden ver sus propios reclamos; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Los usuarios solo pueden ver sus propios reclamos" ON public.crowdfunding_claims FOR SELECT USING ((auth.uid() = user_id));


--
-- TOC entry 4389 (class 3256 OID 24388)
-- Name: attendance Profes ven todo attendance; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Profes ven todo attendance" ON public.attendance FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));


--
-- TOC entry 4396 (class 3256 OID 34547)
-- Name: exercise_library Public exercises are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public exercises are viewable by everyone" ON public.exercise_library FOR SELECT USING (true);


--
-- TOC entry 4390 (class 3256 OID 24396)
-- Name: profiles Public profiles are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);


--
-- TOC entry 4374 (class 3256 OID 17505)
-- Name: profiles Ranking público; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Ranking público" ON public.profiles FOR SELECT USING (true);


--
-- TOC entry 4392 (class 3256 OID 24417)
-- Name: class_sessions Solo Admins crean sesiones; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Solo Admins crean sesiones" ON public.class_sessions FOR INSERT WITH CHECK (((auth.uid() = teacher_id) AND (EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text))))));


--
-- TOC entry 4379 (class 3256 OID 37040)
-- Name: teams Teams are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Teams are viewable by everyone" ON public.teams FOR SELECT USING (true);


--
-- TOC entry 4386 (class 3256 OID 41763)
-- Name: achievements Todo el mundo puede ver el catálogo de logros; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Todo el mundo puede ver el catálogo de logros" ON public.achievements FOR SELECT USING (true);


--
-- TOC entry 4385 (class 3256 OID 41728)
-- Name: notifications Users can delete own notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can delete own notifications" ON public.notifications FOR DELETE USING ((auth.uid() = user_id));


--
-- TOC entry 4397 (class 3256 OID 34548)
-- Name: user_unlocks Users can see their own unlocks; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can see their own unlocks" ON public.user_unlocks FOR SELECT USING ((auth.uid() = user_id));


--
-- TOC entry 4384 (class 3256 OID 41727)
-- Name: notifications Users can update own notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING ((auth.uid() = user_id));


--
-- TOC entry 4383 (class 3256 OID 41726)
-- Name: notifications Users can view own notifications; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING ((auth.uid() = user_id));


--
-- TOC entry 4377 (class 3256 OID 17685)
-- Name: profiles Users can view own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING ((auth.uid() = id));


--
-- TOC entry 4400 (class 3256 OID 41945)
-- Name: site_metrics Usuarios pueden ver sus propias metricas; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Usuarios pueden ver sus propias metricas" ON public.site_metrics FOR SELECT TO authenticated USING ((auth.uid() = user_id));


--
-- TOC entry 4395 (class 3256 OID 28894)
-- Name: user_inventory Ver mi inventario; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Ver mi inventario" ON public.user_inventory FOR SELECT USING ((auth.uid() = user_id));


--
-- TOC entry 4375 (class 3256 OID 17523)
-- Name: transactions Ver mis movimientos; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Ver mis movimientos" ON public.transactions FOR SELECT USING ((auth.uid() = user_id));


--
-- TOC entry 4394 (class 3256 OID 28893)
-- Name: shop_products Ver productos activos; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Ver productos activos" ON public.shop_products FOR SELECT USING ((is_active = true));


--
-- TOC entry 4371 (class 0 OID 41748)
-- Dependencies: 405
-- Name: achievements; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4360 (class 0 OID 24367)
-- Dependencies: 392
-- Name: attendance; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4359 (class 0 OID 24355)
-- Dependencies: 391
-- Name: class_sessions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.class_sessions ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4367 (class 0 OID 39363)
-- Dependencies: 400
-- Name: crowdfunding_campaigns; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.crowdfunding_campaigns ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4369 (class 0 OID 40544)
-- Dependencies: 403
-- Name: crowdfunding_claims; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.crowdfunding_claims ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4368 (class 0 OID 39390)
-- Dependencies: 402
-- Name: crowdfunding_contributions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.crowdfunding_contributions ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4363 (class 0 OID 34516)
-- Dependencies: 395
-- Name: exercise_library; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.exercise_library ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4365 (class 0 OID 34561)
-- Dependencies: 398
-- Name: loot_tiers; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.loot_tiers ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4370 (class 0 OID 41710)
-- Dependencies: 404
-- Name: notifications; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4357 (class 0 OID 17490)
-- Dependencies: 389
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4361 (class 0 OID 28863)
-- Dependencies: 393
-- Name: shop_products; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.shop_products ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4373 (class 0 OID 41926)
-- Dependencies: 407
-- Name: site_metrics; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.site_metrics ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4366 (class 0 OID 37033)
-- Dependencies: 399
-- Name: teams; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4358 (class 0 OID 17509)
-- Dependencies: 390
-- Name: transactions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4372 (class 0 OID 41764)
-- Dependencies: 406
-- Name: user_achievements; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4362 (class 0 OID 28875)
-- Dependencies: 394
-- Name: user_inventory; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_inventory ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4364 (class 0 OID 34527)
-- Dependencies: 396
-- Name: user_unlocks; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_unlocks ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4356 (class 0 OID 17467)
-- Dependencies: 388
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4399 (class 3256 OID 34795)
-- Name: objects Permitir descarga de archivos desbloqueados; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Permitir descarga de archivos desbloqueados" ON storage.objects FOR SELECT TO authenticated USING (((bucket_id = 'exam-content'::text) AND (EXISTS ( SELECT 1
   FROM (public.user_unlocks uu
     JOIN public.exercise_library el ON ((uu.exercise_id = el.id)))
  WHERE ((uu.user_id = auth.uid()) AND ((el.question_path = objects.name) OR ((el.solution_path = objects.name) AND (uu.has_solution = true))))))));


--
-- TOC entry 4349 (class 0 OID 17089)
-- Dependencies: 376
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4353 (class 0 OID 17246)
-- Dependencies: 380
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4354 (class 0 OID 17273)
-- Dependencies: 381
-- Name: buckets_vectors; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_vectors ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4348 (class 0 OID 17081)
-- Dependencies: 375
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4350 (class 0 OID 17099)
-- Dependencies: 377
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4351 (class 0 OID 17149)
-- Dependencies: 378
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4352 (class 0 OID 17163)
-- Dependencies: 379
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4355 (class 0 OID 17283)
-- Dependencies: 382
-- Name: vector_indexes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.vector_indexes ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4403 (class 6104 OID 16426)
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- TOC entry 4448 (class 0 OID 0)
-- Dependencies: 38
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- TOC entry 4450 (class 0 OID 0)
-- Dependencies: 136
-- Name: SCHEMA cron; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA cron TO postgres WITH GRANT OPTION;


--
-- TOC entry 4451 (class 0 OID 0)
-- Dependencies: 24
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- TOC entry 4452 (class 0 OID 0)
-- Dependencies: 40
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- TOC entry 4453 (class 0 OID 0)
-- Dependencies: 14
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- TOC entry 4454 (class 0 OID 0)
-- Dependencies: 39
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- TOC entry 4455 (class 0 OID 0)
-- Dependencies: 33
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- TOC entry 4462 (class 0 OID 0)
-- Dependencies: 468
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- TOC entry 4463 (class 0 OID 0)
-- Dependencies: 549
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- TOC entry 4465 (class 0 OID 0)
-- Dependencies: 423
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- TOC entry 4467 (class 0 OID 0)
-- Dependencies: 439
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- TOC entry 4468 (class 0 OID 0)
-- Dependencies: 446
-- Name: FUNCTION alter_job(job_id bigint, schedule text, command text, database text, username text, active boolean); Type: ACL; Schema: cron; Owner: supabase_admin
--

GRANT ALL ON FUNCTION cron.alter_job(job_id bigint, schedule text, command text, database text, username text, active boolean) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4469 (class 0 OID 0)
-- Dependencies: 492
-- Name: FUNCTION job_cache_invalidate(); Type: ACL; Schema: cron; Owner: supabase_admin
--

GRANT ALL ON FUNCTION cron.job_cache_invalidate() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4470 (class 0 OID 0)
-- Dependencies: 480
-- Name: FUNCTION schedule(schedule text, command text); Type: ACL; Schema: cron; Owner: supabase_admin
--

GRANT ALL ON FUNCTION cron.schedule(schedule text, command text) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4471 (class 0 OID 0)
-- Dependencies: 462
-- Name: FUNCTION schedule(job_name text, schedule text, command text); Type: ACL; Schema: cron; Owner: supabase_admin
--

GRANT ALL ON FUNCTION cron.schedule(job_name text, schedule text, command text) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4472 (class 0 OID 0)
-- Dependencies: 559
-- Name: FUNCTION schedule_in_database(job_name text, schedule text, command text, database text, username text, active boolean); Type: ACL; Schema: cron; Owner: supabase_admin
--

GRANT ALL ON FUNCTION cron.schedule_in_database(job_name text, schedule text, command text, database text, username text, active boolean) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4473 (class 0 OID 0)
-- Dependencies: 518
-- Name: FUNCTION unschedule(job_id bigint); Type: ACL; Schema: cron; Owner: supabase_admin
--

GRANT ALL ON FUNCTION cron.unschedule(job_id bigint) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4474 (class 0 OID 0)
-- Dependencies: 442
-- Name: FUNCTION unschedule(job_name text); Type: ACL; Schema: cron; Owner: supabase_admin
--

GRANT ALL ON FUNCTION cron.unschedule(job_name text) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4475 (class 0 OID 0)
-- Dependencies: 479
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- TOC entry 4476 (class 0 OID 0)
-- Dependencies: 514
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- TOC entry 4477 (class 0 OID 0)
-- Dependencies: 500
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- TOC entry 4478 (class 0 OID 0)
-- Dependencies: 488
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- TOC entry 4479 (class 0 OID 0)
-- Dependencies: 489
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4480 (class 0 OID 0)
-- Dependencies: 456
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4481 (class 0 OID 0)
-- Dependencies: 532
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- TOC entry 4482 (class 0 OID 0)
-- Dependencies: 505
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- TOC entry 4483 (class 0 OID 0)
-- Dependencies: 449
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4484 (class 0 OID 0)
-- Dependencies: 431
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4485 (class 0 OID 0)
-- Dependencies: 512
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- TOC entry 4486 (class 0 OID 0)
-- Dependencies: 427
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- TOC entry 4487 (class 0 OID 0)
-- Dependencies: 564
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- TOC entry 4488 (class 0 OID 0)
-- Dependencies: 560
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- TOC entry 4490 (class 0 OID 0)
-- Dependencies: 460
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- TOC entry 4492 (class 0 OID 0)
-- Dependencies: 538
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4494 (class 0 OID 0)
-- Dependencies: 413
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- TOC entry 4495 (class 0 OID 0)
-- Dependencies: 430
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4496 (class 0 OID 0)
-- Dependencies: 546
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- TOC entry 4497 (class 0 OID 0)
-- Dependencies: 517
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- TOC entry 4498 (class 0 OID 0)
-- Dependencies: 554
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- TOC entry 4499 (class 0 OID 0)
-- Dependencies: 509
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- TOC entry 4500 (class 0 OID 0)
-- Dependencies: 463
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- TOC entry 4501 (class 0 OID 0)
-- Dependencies: 457
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- TOC entry 4502 (class 0 OID 0)
-- Dependencies: 539
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- TOC entry 4503 (class 0 OID 0)
-- Dependencies: 417
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4504 (class 0 OID 0)
-- Dependencies: 541
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- TOC entry 4505 (class 0 OID 0)
-- Dependencies: 434
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- TOC entry 4506 (class 0 OID 0)
-- Dependencies: 552
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4507 (class 0 OID 0)
-- Dependencies: 548
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- TOC entry 4508 (class 0 OID 0)
-- Dependencies: 473
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- TOC entry 4509 (class 0 OID 0)
-- Dependencies: 467
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- TOC entry 4510 (class 0 OID 0)
-- Dependencies: 447
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- TOC entry 4511 (class 0 OID 0)
-- Dependencies: 535
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4512 (class 0 OID 0)
-- Dependencies: 537
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- TOC entry 4513 (class 0 OID 0)
-- Dependencies: 469
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- TOC entry 4514 (class 0 OID 0)
-- Dependencies: 540
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- TOC entry 4515 (class 0 OID 0)
-- Dependencies: 536
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- TOC entry 4516 (class 0 OID 0)
-- Dependencies: 563
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- TOC entry 4517 (class 0 OID 0)
-- Dependencies: 485
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- TOC entry 4518 (class 0 OID 0)
-- Dependencies: 438
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- TOC entry 4519 (class 0 OID 0)
-- Dependencies: 542
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- TOC entry 4520 (class 0 OID 0)
-- Dependencies: 558
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4521 (class 0 OID 0)
-- Dependencies: 551
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4523 (class 0 OID 0)
-- Dependencies: 533
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4524 (class 0 OID 0)
-- Dependencies: 475
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- TOC entry 4525 (class 0 OID 0)
-- Dependencies: 521
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- TOC entry 4526 (class 0 OID 0)
-- Dependencies: 415
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- TOC entry 4527 (class 0 OID 0)
-- Dependencies: 435
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- TOC entry 4528 (class 0 OID 0)
-- Dependencies: 445
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- TOC entry 4529 (class 0 OID 0)
-- Dependencies: 501
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- TOC entry 4530 (class 0 OID 0)
-- Dependencies: 448
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- TOC entry 4531 (class 0 OID 0)
-- Dependencies: 543
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- TOC entry 4532 (class 0 OID 0)
-- Dependencies: 491
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- TOC entry 4533 (class 0 OID 0)
-- Dependencies: 503
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- TOC entry 4534 (class 0 OID 0)
-- Dependencies: 544
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- TOC entry 4535 (class 0 OID 0)
-- Dependencies: 432
-- Name: FUNCTION pg_reload_conf(); Type: ACL; Schema: pg_catalog; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pg_catalog.pg_reload_conf() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4536 (class 0 OID 0)
-- Dependencies: 470
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;


--
-- TOC entry 4537 (class 0 OID 0)
-- Dependencies: 528
-- Name: FUNCTION assign_user_team(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.assign_user_team() TO anon;
GRANT ALL ON FUNCTION public.assign_user_team() TO authenticated;
GRANT ALL ON FUNCTION public.assign_user_team() TO service_role;


--
-- TOC entry 4538 (class 0 OID 0)
-- Dependencies: 490
-- Name: FUNCTION award_monthly_achievements(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.award_monthly_achievements() TO anon;
GRANT ALL ON FUNCTION public.award_monthly_achievements() TO authenticated;
GRANT ALL ON FUNCTION public.award_monthly_achievements() TO service_role;


--
-- TOC entry 4539 (class 0 OID 0)
-- Dependencies: 471
-- Name: FUNCTION buy_item(p_product_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.buy_item(p_product_id uuid) TO anon;
GRANT ALL ON FUNCTION public.buy_item(p_product_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.buy_item(p_product_id uuid) TO service_role;


--
-- TOC entry 4540 (class 0 OID 0)
-- Dependencies: 440
-- Name: FUNCTION check_attendance_achievements(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.check_attendance_achievements() TO anon;
GRANT ALL ON FUNCTION public.check_attendance_achievements() TO authenticated;
GRANT ALL ON FUNCTION public.check_attendance_achievements() TO service_role;


--
-- TOC entry 4541 (class 0 OID 0)
-- Dependencies: 511
-- Name: FUNCTION check_hack_achievement(target_user_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.check_hack_achievement(target_user_id uuid) TO anon;
GRANT ALL ON FUNCTION public.check_hack_achievement(target_user_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.check_hack_achievement(target_user_id uuid) TO service_role;


--
-- TOC entry 4542 (class 0 OID 0)
-- Dependencies: 416
-- Name: FUNCTION check_interference_achievement(target_user_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.check_interference_achievement(target_user_id uuid) TO anon;
GRANT ALL ON FUNCTION public.check_interference_achievement(target_user_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.check_interference_achievement(target_user_id uuid) TO service_role;


--
-- TOC entry 4543 (class 0 OID 0)
-- Dependencies: 452
-- Name: FUNCTION check_night_owl_achievement(target_user_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.check_night_owl_achievement(target_user_id uuid) TO anon;
GRANT ALL ON FUNCTION public.check_night_owl_achievement(target_user_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.check_night_owl_achievement(target_user_id uuid) TO service_role;


--
-- TOC entry 4544 (class 0 OID 0)
-- Dependencies: 455
-- Name: FUNCTION claim_campaign_reward(p_campaign_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.claim_campaign_reward(p_campaign_id uuid) TO anon;
GRANT ALL ON FUNCTION public.claim_campaign_reward(p_campaign_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.claim_campaign_reward(p_campaign_id uuid) TO service_role;


--
-- TOC entry 4545 (class 0 OID 0)
-- Dependencies: 481
-- Name: FUNCTION contribute_to_campaign(campaign_uuid uuid, contribution_amount integer); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.contribute_to_campaign(campaign_uuid uuid, contribution_amount integer) TO anon;
GRANT ALL ON FUNCTION public.contribute_to_campaign(campaign_uuid uuid, contribution_amount integer) TO authenticated;
GRANT ALL ON FUNCTION public.contribute_to_campaign(campaign_uuid uuid, contribution_amount integer) TO service_role;


--
-- TOC entry 4546 (class 0 OID 0)
-- Dependencies: 525
-- Name: FUNCTION create_crowdfunding_campaign(target_product_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.create_crowdfunding_campaign(target_product_id uuid) TO anon;
GRANT ALL ON FUNCTION public.create_crowdfunding_campaign(target_product_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.create_crowdfunding_campaign(target_product_id uuid) TO service_role;


--
-- TOC entry 4547 (class 0 OID 0)
-- Dependencies: 425
-- Name: FUNCTION get_admin_permanent_unlocks(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_admin_permanent_unlocks() TO anon;
GRANT ALL ON FUNCTION public.get_admin_permanent_unlocks() TO authenticated;
GRANT ALL ON FUNCTION public.get_admin_permanent_unlocks() TO service_role;


--
-- TOC entry 4548 (class 0 OID 0)
-- Dependencies: 433
-- Name: FUNCTION get_global_leaderboard(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_global_leaderboard() TO anon;
GRANT ALL ON FUNCTION public.get_global_leaderboard() TO authenticated;
GRANT ALL ON FUNCTION public.get_global_leaderboard() TO service_role;


--
-- TOC entry 4549 (class 0 OID 0)
-- Dependencies: 494
-- Name: FUNCTION get_secure_file_path(p_user_id uuid, p_exercise_id uuid, p_type text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_secure_file_path(p_user_id uuid, p_exercise_id uuid, p_type text) TO anon;
GRANT ALL ON FUNCTION public.get_secure_file_path(p_user_id uuid, p_exercise_id uuid, p_type text) TO authenticated;
GRANT ALL ON FUNCTION public.get_secure_file_path(p_user_id uuid, p_exercise_id uuid, p_type text) TO service_role;


--
-- TOC entry 4550 (class 0 OID 0)
-- Dependencies: 443
-- Name: FUNCTION get_team_leaderboard(min_score_threshold integer); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_team_leaderboard(min_score_threshold integer) TO anon;
GRANT ALL ON FUNCTION public.get_team_leaderboard(min_score_threshold integer) TO authenticated;
GRANT ALL ON FUNCTION public.get_team_leaderboard(min_score_threshold integer) TO service_role;


--
-- TOC entry 4551 (class 0 OID 0)
-- Dependencies: 436
-- Name: FUNCTION grant_achievement_rewards(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.grant_achievement_rewards() TO anon;
GRANT ALL ON FUNCTION public.grant_achievement_rewards() TO authenticated;
GRANT ALL ON FUNCTION public.grant_achievement_rewards() TO service_role;


--
-- TOC entry 4552 (class 0 OID 0)
-- Dependencies: 506
-- Name: FUNCTION handle_100_days_achievement(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_100_days_achievement() TO anon;
GRANT ALL ON FUNCTION public.handle_100_days_achievement() TO authenticated;
GRANT ALL ON FUNCTION public.handle_100_days_achievement() TO service_role;


--
-- TOC entry 4553 (class 0 OID 0)
-- Dependencies: 426
-- Name: FUNCTION handle_attendance_points(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_attendance_points() TO anon;
GRANT ALL ON FUNCTION public.handle_attendance_points() TO authenticated;
GRANT ALL ON FUNCTION public.handle_attendance_points() TO service_role;


--
-- TOC entry 4554 (class 0 OID 0)
-- Dependencies: 497
-- Name: FUNCTION handle_completed_crowdfunding(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_completed_crowdfunding() TO anon;
GRANT ALL ON FUNCTION public.handle_completed_crowdfunding() TO authenticated;
GRANT ALL ON FUNCTION public.handle_completed_crowdfunding() TO service_role;


--
-- TOC entry 4555 (class 0 OID 0)
-- Dependencies: 450
-- Name: FUNCTION handle_crowdfunding_completion_achievements(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_crowdfunding_completion_achievements() TO anon;
GRANT ALL ON FUNCTION public.handle_crowdfunding_completion_achievements() TO authenticated;
GRANT ALL ON FUNCTION public.handle_crowdfunding_completion_achievements() TO service_role;


--
-- TOC entry 4556 (class 0 OID 0)
-- Dependencies: 461
-- Name: FUNCTION handle_crowdfunding_contribution_achievements(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_crowdfunding_contribution_achievements() TO anon;
GRANT ALL ON FUNCTION public.handle_crowdfunding_contribution_achievements() TO authenticated;
GRANT ALL ON FUNCTION public.handle_crowdfunding_contribution_achievements() TO service_role;


--
-- TOC entry 4557 (class 0 OID 0)
-- Dependencies: 522
-- Name: FUNCTION handle_item_consumption_achievements(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_item_consumption_achievements() TO anon;
GRANT ALL ON FUNCTION public.handle_item_consumption_achievements() TO authenticated;
GRANT ALL ON FUNCTION public.handle_item_consumption_achievements() TO service_role;


--
-- TOC entry 4558 (class 0 OID 0)
-- Dependencies: 526
-- Name: FUNCTION handle_new_user(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_new_user() TO anon;
GRANT ALL ON FUNCTION public.handle_new_user() TO authenticated;
GRANT ALL ON FUNCTION public.handle_new_user() TO service_role;


--
-- TOC entry 4559 (class 0 OID 0)
-- Dependencies: 429
-- Name: FUNCTION handle_team_join_achievement(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_team_join_achievement() TO anon;
GRANT ALL ON FUNCTION public.handle_team_join_achievement() TO authenticated;
GRANT ALL ON FUNCTION public.handle_team_join_achievement() TO service_role;


--
-- TOC entry 4560 (class 0 OID 0)
-- Dependencies: 502
-- Name: FUNCTION increment_page_visit(p_path text, p_device text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.increment_page_visit(p_path text, p_device text) TO anon;
GRANT ALL ON FUNCTION public.increment_page_visit(p_path text, p_device text) TO authenticated;
GRANT ALL ON FUNCTION public.increment_page_visit(p_path text, p_device text) TO service_role;


--
-- TOC entry 4561 (class 0 OID 0)
-- Dependencies: 464
-- Name: FUNCTION open_lootbox(p_user_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.open_lootbox(p_user_id uuid) TO anon;
GRANT ALL ON FUNCTION public.open_lootbox(p_user_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.open_lootbox(p_user_id uuid) TO service_role;


--
-- TOC entry 4562 (class 0 OID 0)
-- Dependencies: 465
-- Name: FUNCTION register_attendance(p_session_id uuid, p_secret_code text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.register_attendance(p_session_id uuid, p_secret_code text) TO anon;
GRANT ALL ON FUNCTION public.register_attendance(p_session_id uuid, p_secret_code text) TO authenticated;
GRANT ALL ON FUNCTION public.register_attendance(p_session_id uuid, p_secret_code text) TO service_role;


--
-- TOC entry 4563 (class 0 OID 0)
-- Dependencies: 504
-- Name: FUNCTION set_student_group(group_name text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.set_student_group(group_name text) TO anon;
GRANT ALL ON FUNCTION public.set_student_group(group_name text) TO authenticated;
GRANT ALL ON FUNCTION public.set_student_group(group_name text) TO service_role;


--
-- TOC entry 4564 (class 0 OID 0)
-- Dependencies: 412
-- Name: FUNCTION update_balance(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_balance() TO anon;
GRANT ALL ON FUNCTION public.update_balance() TO authenticated;
GRANT ALL ON FUNCTION public.update_balance() TO service_role;


--
-- TOC entry 4565 (class 0 OID 0)
-- Dependencies: 424
-- Name: FUNCTION update_own_profile_info(new_nickname text, new_avatar_url text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_own_profile_info(new_nickname text, new_avatar_url text) TO anon;
GRANT ALL ON FUNCTION public.update_own_profile_info(new_nickname text, new_avatar_url text) TO authenticated;
GRANT ALL ON FUNCTION public.update_own_profile_info(new_nickname text, new_avatar_url text) TO service_role;


--
-- TOC entry 4566 (class 0 OID 0)
-- Dependencies: 458
-- Name: FUNCTION use_grounding_kit(p_user_id uuid, p_exercise_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.use_grounding_kit(p_user_id uuid, p_exercise_id uuid) TO anon;
GRANT ALL ON FUNCTION public.use_grounding_kit(p_user_id uuid, p_exercise_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.use_grounding_kit(p_user_id uuid, p_exercise_id uuid) TO service_role;


--
-- TOC entry 4567 (class 0 OID 0)
-- Dependencies: 520
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- TOC entry 4568 (class 0 OID 0)
-- Dependencies: 530
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- TOC entry 4569 (class 0 OID 0)
-- Dependencies: 556
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- TOC entry 4570 (class 0 OID 0)
-- Dependencies: 444
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- TOC entry 4571 (class 0 OID 0)
-- Dependencies: 510
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- TOC entry 4572 (class 0 OID 0)
-- Dependencies: 545
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- TOC entry 4573 (class 0 OID 0)
-- Dependencies: 418
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- TOC entry 4574 (class 0 OID 0)
-- Dependencies: 483
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- TOC entry 4575 (class 0 OID 0)
-- Dependencies: 421
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- TOC entry 4576 (class 0 OID 0)
-- Dependencies: 557
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- TOC entry 4577 (class 0 OID 0)
-- Dependencies: 487
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- TOC entry 4578 (class 0 OID 0)
-- Dependencies: 519
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- TOC entry 4579 (class 0 OID 0)
-- Dependencies: 477
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- TOC entry 4580 (class 0 OID 0)
-- Dependencies: 496
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- TOC entry 4581 (class 0 OID 0)
-- Dependencies: 414
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- TOC entry 4583 (class 0 OID 0)
-- Dependencies: 354
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- TOC entry 4585 (class 0 OID 0)
-- Dependencies: 368
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- TOC entry 4588 (class 0 OID 0)
-- Dependencies: 359
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- TOC entry 4590 (class 0 OID 0)
-- Dependencies: 353
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- TOC entry 4592 (class 0 OID 0)
-- Dependencies: 363
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- TOC entry 4594 (class 0 OID 0)
-- Dependencies: 362
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- TOC entry 4597 (class 0 OID 0)
-- Dependencies: 361
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- TOC entry 4598 (class 0 OID 0)
-- Dependencies: 371
-- Name: TABLE oauth_authorizations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_authorizations TO postgres;
GRANT ALL ON TABLE auth.oauth_authorizations TO dashboard_user;


--
-- TOC entry 4600 (class 0 OID 0)
-- Dependencies: 373
-- Name: TABLE oauth_client_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_client_states TO postgres;
GRANT ALL ON TABLE auth.oauth_client_states TO dashboard_user;


--
-- TOC entry 4601 (class 0 OID 0)
-- Dependencies: 370
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_clients TO postgres;
GRANT ALL ON TABLE auth.oauth_clients TO dashboard_user;


--
-- TOC entry 4602 (class 0 OID 0)
-- Dependencies: 372
-- Name: TABLE oauth_consents; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_consents TO postgres;
GRANT ALL ON TABLE auth.oauth_consents TO dashboard_user;


--
-- TOC entry 4603 (class 0 OID 0)
-- Dependencies: 369
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- TOC entry 4605 (class 0 OID 0)
-- Dependencies: 352
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- TOC entry 4607 (class 0 OID 0)
-- Dependencies: 351
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- TOC entry 4609 (class 0 OID 0)
-- Dependencies: 366
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- TOC entry 4611 (class 0 OID 0)
-- Dependencies: 367
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- TOC entry 4613 (class 0 OID 0)
-- Dependencies: 355
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- TOC entry 4618 (class 0 OID 0)
-- Dependencies: 360
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- TOC entry 4620 (class 0 OID 0)
-- Dependencies: 365
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- TOC entry 4623 (class 0 OID 0)
-- Dependencies: 364
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- TOC entry 4626 (class 0 OID 0)
-- Dependencies: 350
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- TOC entry 4627 (class 0 OID 0)
-- Dependencies: 409
-- Name: TABLE job; Type: ACL; Schema: cron; Owner: supabase_admin
--

GRANT SELECT ON TABLE cron.job TO postgres WITH GRANT OPTION;


--
-- TOC entry 4628 (class 0 OID 0)
-- Dependencies: 411
-- Name: TABLE job_run_details; Type: ACL; Schema: cron; Owner: supabase_admin
--

GRANT ALL ON TABLE cron.job_run_details TO postgres WITH GRANT OPTION;


--
-- TOC entry 4629 (class 0 OID 0)
-- Dependencies: 349
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- TOC entry 4630 (class 0 OID 0)
-- Dependencies: 348
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- TOC entry 4631 (class 0 OID 0)
-- Dependencies: 405
-- Name: TABLE achievements; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.achievements TO anon;
GRANT ALL ON TABLE public.achievements TO authenticated;
GRANT ALL ON TABLE public.achievements TO service_role;


--
-- TOC entry 4632 (class 0 OID 0)
-- Dependencies: 392
-- Name: TABLE attendance; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.attendance TO anon;
GRANT ALL ON TABLE public.attendance TO authenticated;
GRANT ALL ON TABLE public.attendance TO service_role;


--
-- TOC entry 4633 (class 0 OID 0)
-- Dependencies: 391
-- Name: TABLE class_sessions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.class_sessions TO anon;
GRANT ALL ON TABLE public.class_sessions TO authenticated;
GRANT ALL ON TABLE public.class_sessions TO service_role;


--
-- TOC entry 4634 (class 0 OID 0)
-- Dependencies: 400
-- Name: TABLE crowdfunding_campaigns; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.crowdfunding_campaigns TO anon;
GRANT ALL ON TABLE public.crowdfunding_campaigns TO authenticated;
GRANT ALL ON TABLE public.crowdfunding_campaigns TO service_role;


--
-- TOC entry 4635 (class 0 OID 0)
-- Dependencies: 403
-- Name: TABLE crowdfunding_claims; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.crowdfunding_claims TO anon;
GRANT ALL ON TABLE public.crowdfunding_claims TO authenticated;
GRANT ALL ON TABLE public.crowdfunding_claims TO service_role;


--
-- TOC entry 4636 (class 0 OID 0)
-- Dependencies: 402
-- Name: TABLE crowdfunding_contributions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.crowdfunding_contributions TO anon;
GRANT ALL ON TABLE public.crowdfunding_contributions TO authenticated;
GRANT ALL ON TABLE public.crowdfunding_contributions TO service_role;


--
-- TOC entry 4637 (class 0 OID 0)
-- Dependencies: 401
-- Name: SEQUENCE crowdfunding_contributions_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.crowdfunding_contributions_id_seq TO anon;
GRANT ALL ON SEQUENCE public.crowdfunding_contributions_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.crowdfunding_contributions_id_seq TO service_role;


--
-- TOC entry 4638 (class 0 OID 0)
-- Dependencies: 395
-- Name: TABLE exercise_library; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.exercise_library TO anon;
GRANT ALL ON TABLE public.exercise_library TO authenticated;
GRANT ALL ON TABLE public.exercise_library TO service_role;


--
-- TOC entry 4639 (class 0 OID 0)
-- Dependencies: 398
-- Name: TABLE loot_tiers; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.loot_tiers TO anon;
GRANT ALL ON TABLE public.loot_tiers TO authenticated;
GRANT ALL ON TABLE public.loot_tiers TO service_role;


--
-- TOC entry 4641 (class 0 OID 0)
-- Dependencies: 397
-- Name: SEQUENCE loot_tiers_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.loot_tiers_id_seq TO anon;
GRANT ALL ON SEQUENCE public.loot_tiers_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.loot_tiers_id_seq TO service_role;


--
-- TOC entry 4642 (class 0 OID 0)
-- Dependencies: 404
-- Name: TABLE notifications; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.notifications TO anon;
GRANT ALL ON TABLE public.notifications TO authenticated;
GRANT ALL ON TABLE public.notifications TO service_role;


--
-- TOC entry 4643 (class 0 OID 0)
-- Dependencies: 389
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profiles TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;


--
-- TOC entry 4644 (class 0 OID 0)
-- Dependencies: 389 4643
-- Name: COLUMN profiles.nickname; Type: ACL; Schema: public; Owner: postgres
--

GRANT UPDATE(nickname) ON TABLE public.profiles TO authenticated;


--
-- TOC entry 4645 (class 0 OID 0)
-- Dependencies: 389 4643
-- Name: COLUMN profiles.avatar_url; Type: ACL; Schema: public; Owner: postgres
--

GRANT UPDATE(avatar_url) ON TABLE public.profiles TO authenticated;


--
-- TOC entry 4646 (class 0 OID 0)
-- Dependencies: 393
-- Name: TABLE shop_products; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.shop_products TO anon;
GRANT ALL ON TABLE public.shop_products TO authenticated;
GRANT ALL ON TABLE public.shop_products TO service_role;


--
-- TOC entry 4647 (class 0 OID 0)
-- Dependencies: 407
-- Name: TABLE site_metrics; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.site_metrics TO anon;
GRANT ALL ON TABLE public.site_metrics TO authenticated;
GRANT ALL ON TABLE public.site_metrics TO service_role;


--
-- TOC entry 4648 (class 0 OID 0)
-- Dependencies: 399
-- Name: TABLE teams; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.teams TO anon;
GRANT ALL ON TABLE public.teams TO authenticated;
GRANT ALL ON TABLE public.teams TO service_role;


--
-- TOC entry 4649 (class 0 OID 0)
-- Dependencies: 390
-- Name: TABLE transactions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.transactions TO anon;
GRANT ALL ON TABLE public.transactions TO authenticated;
GRANT ALL ON TABLE public.transactions TO service_role;


--
-- TOC entry 4650 (class 0 OID 0)
-- Dependencies: 406
-- Name: TABLE user_achievements; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_achievements TO anon;
GRANT ALL ON TABLE public.user_achievements TO authenticated;
GRANT ALL ON TABLE public.user_achievements TO service_role;


--
-- TOC entry 4651 (class 0 OID 0)
-- Dependencies: 394
-- Name: TABLE user_inventory; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_inventory TO anon;
GRANT ALL ON TABLE public.user_inventory TO authenticated;
GRANT ALL ON TABLE public.user_inventory TO service_role;


--
-- TOC entry 4652 (class 0 OID 0)
-- Dependencies: 396
-- Name: TABLE user_unlocks; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_unlocks TO anon;
GRANT ALL ON TABLE public.user_unlocks TO authenticated;
GRANT ALL ON TABLE public.user_unlocks TO service_role;


--
-- TOC entry 4653 (class 0 OID 0)
-- Dependencies: 388
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- TOC entry 4654 (class 0 OID 0)
-- Dependencies: 374
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- TOC entry 4655 (class 0 OID 0)
-- Dependencies: 385
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- TOC entry 4656 (class 0 OID 0)
-- Dependencies: 384
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- TOC entry 4658 (class 0 OID 0)
-- Dependencies: 376
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.buckets FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.buckets TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- TOC entry 4659 (class 0 OID 0)
-- Dependencies: 380
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets_analytics TO service_role;
GRANT ALL ON TABLE storage.buckets_analytics TO authenticated;
GRANT ALL ON TABLE storage.buckets_analytics TO anon;


--
-- TOC entry 4660 (class 0 OID 0)
-- Dependencies: 381
-- Name: TABLE buckets_vectors; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.buckets_vectors TO service_role;
GRANT SELECT ON TABLE storage.buckets_vectors TO authenticated;
GRANT SELECT ON TABLE storage.buckets_vectors TO anon;


--
-- TOC entry 4662 (class 0 OID 0)
-- Dependencies: 377
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.objects FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.objects TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- TOC entry 4663 (class 0 OID 0)
-- Dependencies: 378
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- TOC entry 4664 (class 0 OID 0)
-- Dependencies: 379
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- TOC entry 4665 (class 0 OID 0)
-- Dependencies: 382
-- Name: TABLE vector_indexes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.vector_indexes TO service_role;
GRANT SELECT ON TABLE storage.vector_indexes TO authenticated;
GRANT SELECT ON TABLE storage.vector_indexes TO anon;


--
-- TOC entry 4666 (class 0 OID 0)
-- Dependencies: 356
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- TOC entry 4667 (class 0 OID 0)
-- Dependencies: 357
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- TOC entry 2590 (class 826 OID 16553)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- TOC entry 2591 (class 826 OID 16554)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- TOC entry 2589 (class 826 OID 16552)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- TOC entry 2604 (class 826 OID 45398)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: cron; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA cron GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- TOC entry 2606 (class 826 OID 45397)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: cron; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA cron GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- TOC entry 2605 (class 826 OID 45396)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: cron; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA cron GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- TOC entry 2600 (class 826 OID 16632)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- TOC entry 2599 (class 826 OID 16631)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- TOC entry 2598 (class 826 OID 16630)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- TOC entry 2603 (class 826 OID 16587)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2602 (class 826 OID 16586)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2601 (class 826 OID 16585)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2595 (class 826 OID 16567)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2597 (class 826 OID 16566)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2596 (class 826 OID 16565)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2582 (class 826 OID 16490)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2583 (class 826 OID 16491)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2581 (class 826 OID 16489)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2585 (class 826 OID 16493)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2580 (class 826 OID 16488)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2584 (class 826 OID 16492)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2593 (class 826 OID 16557)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- TOC entry 2594 (class 826 OID 16558)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- TOC entry 2592 (class 826 OID 16556)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- TOC entry 2588 (class 826 OID 16546)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2587 (class 826 OID 16545)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2586 (class 826 OID 16544)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 3774 (class 3466 OID 16571)
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- TOC entry 3779 (class 3466 OID 16650)
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- TOC entry 3773 (class 3466 OID 16569)
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- TOC entry 3780 (class 3466 OID 16653)
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- TOC entry 3775 (class 3466 OID 16572)
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- TOC entry 3776 (class 3466 OID 16573)
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

-- Completed on 2026-02-19 13:21:54 CET

--
-- PostgreSQL database dump complete
--

\unrestrict RN4hZKlfwQz4nRAkMX3JN8uhkT7qG1sepqU2n3hPLveOSHQQU9nV1fmd79VKkJX

