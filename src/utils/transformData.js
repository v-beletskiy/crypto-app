export default class TransformData {
  static prepareIndexPageCryptocurrencyData = (data) => {
    const preparedData = data.map((elem) => {
      return (
        {
          symbol: elem.symbol,
          name: elem.name,
          marketCap: elem?.quote?.USD?.market_cap,
          pricePerUnit: elem?.quote?.USD?.price,
          marketVolume: elem?.quote?.USD?.volume_24h,
          percentChange24: elem?.quote?.USD?.percent_change_24h,
        }
      );
    });
    return preparedData;
  };

  static prepareCurrentPageCryptocurrencyData = (data) => {
      return (
        {
            symbol: data.symbol,
            name: data.name,
            cmcRank: data.cmc_rank,
            numMarketPairs: data.num_market_pairs,
            dateAdded: new Date(data.date_added).toLocaleDateString(),
            tags: data?.tags?.join(', '),
            maxSupply: data.max_supply,
            circulatingSupply: data.circulating_supply,
            price: data?.quote?.USD?.price,
            marketVolume: data?.quote?.USD?.volume_24h,
            percentChange1: data?.quote?.USD?.percent_change_1h,
            percentChange24: data?.quote?.USD?.percent_change_24h,
            percentChange7d: data?.quote?.USD?.percent_change_7d,
            marketCap: data?.quote?.USD?.market_cap,
            lastUpdated: new Date(data?.quote?.USD?.last_updated).toLocaleDateString(),
        }
      )
  }

  static prepareCryptocurrencyHistoricData = data => {
    const preparedData = data.map((elem, i) => {
      return (
        {
          x: i + 1,
          y: +elem.marketCap.toFixed(0)
        }
      )
    });
    return preparedData;
  }
}
