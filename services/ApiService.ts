import queryString from 'query-string';

const URL =
  process.env.NODE_ENV === 'production'
    ? process.env.API_PRODUCTION
    : process.env.API_DEVELOPMENT;

export default {
  async get(url: string, options: any = {}) {
    let qs = '';
    if (options.qs) {
      qs =
        (url.indexOf('?') === -1 ? '?' : '&') +
        queryString.stringify(options.qs);
    }
    return fetch(`${URL}${url}${qs}`, {
      mode: 'cors',
      method: 'GET',
      ...options
    });
  },

  async post(url: string, data: any, headers = {}) {
    const res = await fetch(`${URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(data)
    });
    return res;
  },

  async delete(url: string) {
    const res = await fetch(`${URL}${url}`, { method: 'DELETE' });
    if (!res.ok) {
      throw new Error('DELETE error');
    } else {
      return res.json();
    }
  },

  async patch(url: string, data: any) {
    const res = await fetch(`${URL}${url}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      throw new Error('PATCH error');
    } else {
      return res.json();
    }
  }
};
