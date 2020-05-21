import Cookies from 'js-cookie';

import { useEffect } from 'react';
import Router from 'next/router';
import jwtDecode from 'jwt-decode';
// eslint-disable-next-line no-unused-vars
import { NextPageContext } from 'next';
import cookie from 'cookie';

export const logout = (ctx: NextPageContext) => {
  if (typeof window === 'undefined') {
    const { res } = ctx;
    let cookies = res.getHeader('Set-Cookie') || [];

    if (typeof cookies === 'string') { cookies = [cookies]; }
    if (typeof cookies === 'number') { cookies = []; }

    cookies.push(cookie.serialize('jwt', ''));
    res.setHeader('Set-Cookie', cookies);
    res.writeHead(302, { Location: '/login' });
    res.end();
  } else {
    Cookies.remove('jwt');
    window.localStorage.setItem('logout', `${Date.now()}`);
    Router.push('/login');
  }
};

const getJwt = (ctx: NextPageContext) => {
  try {
    if (typeof window === 'undefined') {
      // if we're server-side, we grab the cookie from the request headers
      const { req } = ctx;
      return cookie.parse(req.headers.cookie).jwt;
    }
    // if we're client-side, we get the cookie with js
    return Cookies.get('jwt');
  } catch (error) {
    // if we have trouble decoding the jwt or retrieving it, assume the user is null
    return '';
  }
};

const getUser = (ctx: NextPageContext) => {
  try {
    return jwtDecode(getJwt(ctx));
  } catch (error) {
    return null;
  }
};

export async function authFetch(
  url: string, method: string, body: any, ctx: NextPageContext,
) {
  const jwt = getJwt(ctx);
  const res = await fetch(`http://localhost:5000/${url}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: jwt,
    },
  });
  if (res.status === 401) {
    // this means our token is wrong/non-existent/expired
    logout(ctx);
  }
  return res;
}

export async function authFetchForm(
  url: string, method: string, body: FormData, ctx: NextPageContext,
) {
  const jwt = getJwt(ctx);
  const res = await fetch(`http://localhost:5000/${url}`, {
    method,
    body,
    headers: {
      Authorization: jwt,
    },
  });
  if (res.status === 401) {
    // this means our token is wrong/non-existent/expired
    logout(ctx);
  }
  return res;
}

export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        Router.push('/login');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);
    const { user } = props;
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} user={user} />;
  };

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const user = getUser(ctx);
    if (Component.getInitialProps) {
      return { ...(await Component.getInitialProps(ctx)), user };
    }
    return { user };
  };

  return Wrapper;
};
