from aiohttp import ClientSession, TCPConnector, ClientTimeout
import ssl

class HTTPClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url
        self.api_key = api_key
        self.ssl_context = ssl.create_default_context()
        self.ssl_context.check_hostname = False
        self.ssl_context.verify_mode = ssl.CERT_NONE
        self.timeout = ClientTimeout(total=None)

    async def _request(self, method, path, **kwargs):
        async with ClientSession(connector=TCPConnector(ssl=self.ssl_context), timeout=self.timeout) as session:
            async with session.request(method, self.base_url + path, **kwargs) as response:
                return await response.json()

class CMCHTTPClient(HTTPClient):
    async def get_listings(self):
        return await self._request("GET", "/v1/cryptocurrency/listings/latest", headers={'X-CMC_PRO_API_KEY': self.api_key})

    async def get_currency(self, currency_id: int):
        return await self._request("GET", "/v2/cryptocurrency/quotes/latest", params={"id": currency_id}, headers={'X-CMC_PRO_API_KEY': self.api_key})
