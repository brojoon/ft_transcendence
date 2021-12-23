--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Debian 13.4-1.pgdg100+1)
-- Dumped by pg_dump version 13.4 (Debian 13.4-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: block; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.block (
    "userId1" character varying(30) NOT NULL,
    "userId2" character varying(30) NOT NULL
);


ALTER TABLE public.block OWNER TO postgres;

--
-- Name: blockmember; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blockmember (
    "userId" character varying(30) NOT NULL,
    "channelId" integer NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.blockmember OWNER TO postgres;

--
-- Name: chatchannel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chatchannel (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    type integer DEFAULT 0 NOT NULL,
    "authId" character varying(30) NOT NULL,
    password character varying(100),
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deleteAt" timestamp without time zone
);


ALTER TABLE public.chatchannel OWNER TO postgres;

--
-- Name: chatchannel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chatchannel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chatchannel_id_seq OWNER TO postgres;

--
-- Name: chatchannel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chatchannel_id_seq OWNED BY public.chatchannel.id;


--
-- Name: chatcontent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chatcontent (
    id integer NOT NULL,
    "userId" character varying(30) NOT NULL,
    "channelId" integer NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.chatcontent OWNER TO postgres;

--
-- Name: chatcontent_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chatcontent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chatcontent_id_seq OWNER TO postgres;

--
-- Name: chatcontent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chatcontent_id_seq OWNED BY public.chatcontent.id;


--
-- Name: chatmember; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chatmember (
    "userId" character varying(30) NOT NULL,
    "channelId" integer NOT NULL,
    mute boolean DEFAULT false NOT NULL,
    auth integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "muteExpired" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.chatmember OWNER TO postgres;

--
-- Name: connect; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.connect (
    "userId" character varying(30) NOT NULL,
    state boolean DEFAULT false NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.connect OWNER TO postgres;

--
-- Name: dm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dm (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.dm OWNER TO postgres;

--
-- Name: dm_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dm_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dm_id_seq OWNER TO postgres;

--
-- Name: dm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dm_id_seq OWNED BY public.dm.id;


--
-- Name: dmcontent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dmcontent (
    id integer NOT NULL,
    "dmId" integer NOT NULL,
    "userId1" character varying(30) NOT NULL,
    "userId2" character varying(30) NOT NULL,
    message text,
    match integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "historyId" integer,
    "histortId" integer
);


ALTER TABLE public.dmcontent OWNER TO postgres;

--
-- Name: dmcontent_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dmcontent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dmcontent_id_seq OWNER TO postgres;

--
-- Name: dmcontent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dmcontent_id_seq OWNED BY public.dmcontent.id;


--
-- Name: friend; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.friend (
    "userId1" character varying(30) NOT NULL,
    "userId2" character varying(30) NOT NULL
);


ALTER TABLE public.friend OWNER TO postgres;

--
-- Name: history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.history (
    id integer NOT NULL,
    "userId1" character varying(30) NOT NULL,
    "userId2" character varying(30) NOT NULL,
    "playerOneJoin" integer DEFAULT 0 NOT NULL,
    "playerTwoJoin" integer DEFAULT 0 NOT NULL,
    "user1Point" integer DEFAULT 0 NOT NULL,
    "user2Point" integer DEFAULT 0 NOT NULL,
    winner character varying(30),
    loser character varying(30),
    state integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.history OWNER TO postgres;

--
-- Name: history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.history_id_seq OWNER TO postgres;

--
-- Name: history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.history_id_seq OWNED BY public.history.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    "userId" character varying(30) NOT NULL,
    username character varying(30) NOT NULL,
    "oauthId" numeric NOT NULL,
    email character varying(30) NOT NULL,
    profile character varying(100),
    password character varying(100) NOT NULL,
    "twoFactorAuth" character varying(200),
    "twofactorEnable" boolean DEFAULT false NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    moderator boolean DEFAULT false NOT NULL,
    ban boolean DEFAULT false NOT NULL,
    "maxStarOfFreinds" integer DEFAULT 0 NOT NULL,
    "maxStarOfFreindsTime" timestamp without time zone,
    "maxStarOfDms" integer DEFAULT 0 NOT NULL,
    "maxStarOfDmsTime" timestamp without time zone,
    "maxStarOfChannels" integer DEFAULT 0 NOT NULL,
    "maxStarOfChannelsTime" timestamp without time zone,
    "maxStarOfVictory" integer DEFAULT 0 NOT NULL,
    "maxStarOfVictoryTime" timestamp without time zone,
    "maxStarOfLose" integer DEFAULT 0 NOT NULL,
    "maxStarOfLoseTime" timestamp without time zone,
    "maxStarOfFight" integer DEFAULT 0 NOT NULL,
    "maxStarOfFightTime" timestamp without time zone,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deleteAt" timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: chatchannel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatchannel ALTER COLUMN id SET DEFAULT nextval('public.chatchannel_id_seq'::regclass);


--
-- Name: chatcontent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatcontent ALTER COLUMN id SET DEFAULT nextval('public.chatcontent_id_seq'::regclass);


--
-- Name: dm id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm ALTER COLUMN id SET DEFAULT nextval('public.dm_id_seq'::regclass);


--
-- Name: dmcontent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dmcontent ALTER COLUMN id SET DEFAULT nextval('public.dmcontent_id_seq'::regclass);


--
-- Name: history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history ALTER COLUMN id SET DEFAULT nextval('public.history_id_seq'::regclass);


--
-- Data for Name: block; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.block ("userId1", "userId2") FROM stdin;
\.


--
-- Data for Name: blockmember; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blockmember ("userId", "channelId", "updatedAt") FROM stdin;
\.


--
-- Data for Name: chatchannel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chatchannel (id, name, type, "authId", password, "createdAt", "updatedAt", "deleteAt") FROM stdin;
\.


--
-- Data for Name: chatcontent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chatcontent (id, "userId", "channelId", message, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: chatmember; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chatmember ("userId", "channelId", mute, auth, "createdAt", "updatedAt", "muteExpired") FROM stdin;
\.


--
-- Data for Name: connect; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.connect ("userId", state, "updatedAt") FROM stdin;
youngrch	t	2021-12-23 14:01:25.687069
111	t	2021-12-23 14:02:04.694174
222	t	2021-12-23 14:02:08.147249
333	t	2021-12-23 14:02:10.84649
\.


--
-- Data for Name: dm; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dm (id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: dmcontent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dmcontent (id, "dmId", "userId1", "userId2", message, match, "createdAt", "updatedAt", "historyId", "histortId") FROM stdin;
\.


--
-- Data for Name: friend; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.friend ("userId1", "userId2") FROM stdin;
\.


--
-- Data for Name: history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.history (id, "userId1", "userId2", "playerOneJoin", "playerTwoJoin", "user1Point", "user2Point", winner, loser, state, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users ("userId", username, "oauthId", email, profile, password, "twoFactorAuth", "twofactorEnable", admin, moderator, ban, "maxStarOfFreinds", "maxStarOfFreindsTime", "maxStarOfDms", "maxStarOfDmsTime", "maxStarOfChannels", "maxStarOfChannelsTime", "maxStarOfVictory", "maxStarOfVictoryTime", "maxStarOfLose", "maxStarOfLoseTime", "maxStarOfFight", "maxStarOfFightTime", "createdAt", "updatedAt", "deleteAt") FROM stdin;
333	333	333	333@naver.com	\N	$2b$12$QXOn6js.WnmZrGQ.evonFuCqWNFHdj3xGdwriznroTp5gvA6H.deW	\N	f	f	f	f	0	\N	0	\N	0	\N	0	\N	0	\N	0	\N	2021-12-23 14:02:10.794469	2021-12-23 14:03:00.103834	\N
222	222	222	222@naver.com	\N	$2b$12$UE17kgCCg8AjPIy3oPAHLuMsqB/RV5Nbe6eJ9rbceKqRzuu1Ry1ea	\N	f	f	f	f	0	\N	0	\N	0	\N	0	\N	0	\N	0	\N	2021-12-23 14:02:08.099567	2021-12-23 14:03:16.729913	\N
111	111	111	111@naver.com	\N	$2b$12$PJQsXOoPs27BqJKlbJuzdOMK/z8QFQBex0vWWaV.hOllXPK667h96	\N	f	f	f	f	0	\N	0	\N	0	\N	0	\N	0	\N	0	\N	2021-12-23 14:02:04.639647	2021-12-23 14:03:23.5519	\N
youngrch	youngrch	81737	youngrch@student.42seoul.kr	https://cdn.intra.42.fr/users/youngrch.jpg	$2b$12$7oioY.rIUiwHdm2JRODTFepG5Pg1tD.v1aAQKcCeXk8Mqij0w1EQK	\N	f	t	f	f	0	\N	0	\N	0	\N	0	\N	0	\N	0	\N	2021-12-23 14:01:25.562568	2021-12-23 14:03:39.57566	\N
\.


--
-- Name: chatchannel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chatchannel_id_seq', 1, false);


--
-- Name: chatcontent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chatcontent_id_seq', 1, false);


--
-- Name: dm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dm_id_seq', 1, false);


--
-- Name: dmcontent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dmcontent_id_seq', 1, false);


--
-- Name: history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.history_id_seq', 1, false);


--
-- Name: chatcontent PK_0c26b6fdf304c26d368b3d77964; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatcontent
    ADD CONSTRAINT "PK_0c26b6fdf304c26d368b3d77964" PRIMARY KEY (id, "userId", "channelId");


--
-- Name: block PK_280f77c9223c0dfbdffb899ea59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.block
    ADD CONSTRAINT "PK_280f77c9223c0dfbdffb899ea59" PRIMARY KEY ("userId1", "userId2");


--
-- Name: dm PK_3d25307480b6db04b2ea3b7f204; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm
    ADD CONSTRAINT "PK_3d25307480b6db04b2ea3b7f204" PRIMARY KEY (id);


--
-- Name: users PK_8bf09ba754322ab9c22a215c919; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId");


--
-- Name: history PK_9384942edf4804b38ca0ee51416; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history
    ADD CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY (id);


--
-- Name: chatchannel PK_a75595992048e1a611e8d9e8bd6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatchannel
    ADD CONSTRAINT "PK_a75595992048e1a611e8d9e8bd6" PRIMARY KEY (id);


--
-- Name: dmcontent PK_b8650e545ab59b44c1447c3e653; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dmcontent
    ADD CONSTRAINT "PK_b8650e545ab59b44c1447c3e653" PRIMARY KEY (id, "dmId", "userId1", "userId2");


--
-- Name: blockmember PK_c46cc89e832f58cb32d4ae324d4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blockmember
    ADD CONSTRAINT "PK_c46cc89e832f58cb32d4ae324d4" PRIMARY KEY ("userId", "channelId");


--
-- Name: connect PK_cb1f2d0b6440360515a65f9a6c5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.connect
    ADD CONSTRAINT "PK_cb1f2d0b6440360515a65f9a6c5" PRIMARY KEY ("userId");


--
-- Name: chatmember PK_cbe1e5c25abd133f7630325e5d0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatmember
    ADD CONSTRAINT "PK_cbe1e5c25abd133f7630325e5d0" PRIMARY KEY ("userId", "channelId");


--
-- Name: friend PK_d775a931695d7acd4d589d0ccf2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friend
    ADD CONSTRAINT "PK_d775a931695d7acd4d589d0ccf2" PRIMARY KEY ("userId1", "userId2");


--
-- Name: users UQ_2e89173fa19a61572ca27aca54e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_2e89173fa19a61572ca27aca54e" UNIQUE ("oauthId");


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: FK_chatChannel_TO_chatContent_1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_chatChannel_TO_chatContent_1" ON public.chatcontent USING btree ("channelId");


--
-- Name: FK_chatChannel_TO_chatMember_1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_chatChannel_TO_chatMember_1" ON public.chatmember USING btree ("channelId");


--
-- Name: FK_dm_TO_dmContent_1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_dm_TO_dmContent_1" ON public.dmcontent USING btree ("dmId");


--
-- Name: FK_history_TO_dmContent_1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_history_TO_dmContent_1" ON public.dmcontent USING btree ("historyId");


--
-- Name: FK_users_TO_block_2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_users_TO_block_2" ON public.block USING btree ("userId2");


--
-- Name: FK_users_TO_chatContent_1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_users_TO_chatContent_1" ON public.chatcontent USING btree ("userId");


--
-- Name: FK_users_TO_dmContent_1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_users_TO_dmContent_1" ON public.dmcontent USING btree ("userId1");


--
-- Name: FK_users_TO_dmContent_2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_users_TO_dmContent_2" ON public.dmcontent USING btree ("userId2");


--
-- Name: FK_users_TO_friend_2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_users_TO_friend_2" ON public.friend USING btree ("userId2");


--
-- Name: FK_users_TO_history_1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_users_TO_history_1" ON public.history USING btree ("userId1");


--
-- Name: FK_users_TO_history_2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_users_TO_history_2" ON public.history USING btree ("userId2");


--
-- Name: chatmember FK_0c293cc80426a51c456c2db5b8a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatmember
    ADD CONSTRAINT "FK_0c293cc80426a51c456c2db5b8a" FOREIGN KEY ("channelId") REFERENCES public.chatchannel(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: history FK_0d8510ee195dcfdadaf50b60c0d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history
    ADD CONSTRAINT "FK_0d8510ee195dcfdadaf50b60c0d" FOREIGN KEY ("userId2") REFERENCES public.users("userId") ON UPDATE CASCADE;


--
-- Name: history FK_295c8e89b2f13e6d5b7b275b988; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history
    ADD CONSTRAINT "FK_295c8e89b2f13e6d5b7b275b988" FOREIGN KEY ("userId1") REFERENCES public.users("userId") ON UPDATE CASCADE;


--
-- Name: chatmember FK_2ba571895ccadd0aef53058c21d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatmember
    ADD CONSTRAINT "FK_2ba571895ccadd0aef53058c21d" FOREIGN KEY ("userId") REFERENCES public.users("userId") ON UPDATE CASCADE;


--
-- Name: block FK_3a03a8d3708c532e09841761339; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.block
    ADD CONSTRAINT "FK_3a03a8d3708c532e09841761339" FOREIGN KEY ("userId1") REFERENCES public.users("userId") ON UPDATE CASCADE;


--
-- Name: chatcontent FK_4f05bf6cef8817721e0f4793f43; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatcontent
    ADD CONSTRAINT "FK_4f05bf6cef8817721e0f4793f43" FOREIGN KEY ("userId") REFERENCES public.users("userId") ON UPDATE CASCADE;


--
-- Name: friend FK_577649328d7eb268b1c59f3d9bb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friend
    ADD CONSTRAINT "FK_577649328d7eb268b1c59f3d9bb" FOREIGN KEY ("userId2") REFERENCES public.users("userId") ON UPDATE CASCADE;


--
-- Name: blockmember FK_58504fec4464d257c60452ccb63; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blockmember
    ADD CONSTRAINT "FK_58504fec4464d257c60452ccb63" FOREIGN KEY ("userId") REFERENCES public.users("userId") ON UPDATE CASCADE;


--
-- Name: blockmember FK_63e88f17edc02fc888d77fee277; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blockmember
    ADD CONSTRAINT "FK_63e88f17edc02fc888d77fee277" FOREIGN KEY ("channelId") REFERENCES public.chatchannel(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: dmcontent FK_74f670348ffaa97a6d64d69a919; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dmcontent
    ADD CONSTRAINT "FK_74f670348ffaa97a6d64d69a919" FOREIGN KEY ("userId1") REFERENCES public.users("userId") ON UPDATE CASCADE;


--
-- Name: chatcontent FK_7adc0b6998aa704e172d816fdce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chatcontent
    ADD CONSTRAINT "FK_7adc0b6998aa704e172d816fdce" FOREIGN KEY ("channelId") REFERENCES public.chatchannel(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: dmcontent FK_903f68a3edfe85555da0f25fdbf; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dmcontent
    ADD CONSTRAINT "FK_903f68a3edfe85555da0f25fdbf" FOREIGN KEY ("dmId") REFERENCES public.dm(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: dmcontent FK_91a6b0e390079c9b2844a23ca77; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dmcontent
    ADD CONSTRAINT "FK_91a6b0e390079c9b2844a23ca77" FOREIGN KEY ("userId2") REFERENCES public.users("userId") ON UPDATE CASCADE;


--
-- Name: dmcontent FK_945e2abac2e41ab4262ae869b3f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dmcontent
    ADD CONSTRAINT "FK_945e2abac2e41ab4262ae869b3f" FOREIGN KEY ("histortId") REFERENCES public.history(id) ON UPDATE CASCADE;


--
-- Name: block FK_b34c82b8e977cc024ae4ff8ed65; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.block
    ADD CONSTRAINT "FK_b34c82b8e977cc024ae4ff8ed65" FOREIGN KEY ("userId2") REFERENCES public.users("userId") ON UPDATE CASCADE;


--
-- Name: friend FK_c847bd845f68b55db2568692f87; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friend
    ADD CONSTRAINT "FK_c847bd845f68b55db2568692f87" FOREIGN KEY ("userId1") REFERENCES public.users("userId") ON UPDATE CASCADE;


--
-- Name: connect FK_cb1f2d0b6440360515a65f9a6c5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.connect
    ADD CONSTRAINT "FK_cb1f2d0b6440360515a65f9a6c5" FOREIGN KEY ("userId") REFERENCES public.users("userId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

