const Datastore = require('nedb');
const Binance = require('binance-api-node').default;
const fs = require('fs');

class CryptoDatabase 
{
    constructor() 
    {
        this.coins = [
            'BTCUSDT',
            'ETHUSDT',
            'BNBUSDT',
            'NEOUSDT',
            'LTCUSDT',
            'QTUMUSDT',
            'ADAUSDT',
            'XRPUSDT',
            'EOSUSDT',
            'TUSDUSDT',
            'IOTAUSDT',
            'XLMUSDT',
            'ONTUSDT',
            'TRXUSDT',
            'ETCUSDT',
            'ICXUSDT',
            'NULSUSDT',
            'VETUSDT',
            'USDCUSDT',
            'LINKUSDT',
            'WAVESUSDT',
            'ONGUSDT',
            'HOTUSDT',
            'ZILUSDT',
            'ZRXUSDT',
            'FETUSDT',
            'BATUSDT',
            'XMRUSDT',
            'ZECUSDT',
            'IOSTUSDT',
            'CELRUSDT',
            'DASHUSDT',
            'OMGUSDT',
            'THETAUSDT',
            'ENJUSDT',
            'MITHUSDT',
            'MATICUSDT',
            'ATOMUSDT',
            'TFUELUSDT',
            'ONEUSDT',
            'FTMUSDT',
            'ALGOUSDT',
            'GTOUSDT',
            'DOGEUSDT',
            'DUSKUSDT',
            'ANKRUSDT',
            'WINUSDT',
            'COSUSDT',
            'COCOSUSDT',
            'MTLUSDT',
            'TOMOUSDT',
            'PERLUSDT',
            'DENTUSDT',
            'MFTUSDT',
            'KEYUSDT',
            'DOCKUSDT',
            'WANUSDT',
            'FUNUSDT',
            'CVCUSDT',
            'CHZUSDT',
            'BANDUSDT',
            'BUSDUSDT',
            'BEAMUSDT',
            'XTZUSDT',
            'RENUSDT',
            'RVNUSDT',
            'HBARUSDT',
            'NKNUSDT',
            'STXUSDT',
            'KAVAUSDT',
            'ARPAUSDT',
            'IOTXUSDT',
            'RLCUSDT',
            'CTXCUSDT',
            'BCHUSDT',
            'TROYUSDT',
            'VITEUSDT',
            'FTTUSDT',
            'OGNUSDT',
            'DREPUSDT',
            'TCTUSDT',
            'WRXUSDT',
            'BTSUSDT',
            'LSKUSDT',
            'BNTUSDT',
            'LTOUSDT',
            'AIONUSDT',
            'MBLUSDT',
            'COTIUSDT',
            'STPTUSDT',
            'WTCUSDT',
            'DATAUSDT',
            'SOLUSDT',
            'CTSIUSDT',
            'HIVEUSDT',
            'CHRUSDT',
            'BTCUPUSDT',
            'BTCDOWNUSDT',
            'ARDRUSDT',
            'MDTUSDT',
            'STMXUSDT',
            'KNCUSDT',
            'REPUSDT',
            'LRCUSDT',
            'PNTUSDT',
            'COMPUSDT',
            'SCUSDT',
            'ZENUSDT',
            'SNXUSDT',
            'ETHUPUSDT',
            'ETHDOWNUSDT',
            'ADAUPUSDT',
            'ADADOWNUSDT',
            'LINKUPUSDT',
            'LINKDOWNUSDT',
            'VTHOUSDT',
            'DGBUSDT',
            'GBPUSDT',
            'SXPUSDT',
            'MKRUSDT',
            'DCRUSDT',
            'STORJUSDT',
            'BNBUPUSDT',
            'BNBDOWNUSDT',
            'MANAUSDT',
            'AUDUSDT',
            'YFIUSDT',
            'BALUSDT',
            'BLZUSDT',
            'IRISUSDT',
            'KMDUSDT',
            'JSTUSDT',
            'SRMUSDT',
            'ANTUSDT',
            'CRVUSDT',
            'SANDUSDT',
            'OCEANUSDT',
            'NMRUSDT',
            'DOTUSDT',
            'LUNAUSDT',
            'RSRUSDT',
            'PAXGUSDT',
            'WNXMUSDT',
            'TRBUSDT',
            'SUSHIUSDT',
            'YFIIUSDT',
            'KSMUSDT',
            'EGLDUSDT',
            'DIAUSDT',
            'RUNEUSDT',
            'FIOUSDT',
            'UMAUSDT',
            'TRXUPUSDT',
            'TRXDOWNUSDT',
            'XRPUPUSDT',
            'XRPDOWNUSDT',
            'DOTUPUSDT',
            'DOTDOWNUSDT',
            'BELUSDT',
            'WINGUSDT',
            'UNIUSDT',
            'NBSUSDT',
            'OXTUSDT',
            'SUNUSDT',
            'AVAXUSDT',
            'HNTUSDT',
            'FLMUSDT',
            'ORNUSDT',
            'UTKUSDT',
            'XVSUSDT',
            'ALPHAUSDT',
            'AAVEUSDT',
            'NEARUSDT',
            'FILUSDT',
            'INJUSDT',
            'AUDIOUSDT',
            'CTKUSDT',
            'AKROUSDT',
            'AXSUSDT',
            'HARDUSDT',
            'DNTUSDT',
            'STRAXUSDT',
            'UNFIUSDT',
            'ROSEUSDT',
            'AVAUSDT',
            'XEMUSDT',
            'SKLUSDT',
            'GRTUSDT',
            'JUVUSDT',
            'PSGUSDT',
            '1INCHUSDT',
            'REEFUSDT',
            'OGUSDT',
            'ATMUSDT',
            'ASRUSDT',
            'CELOUSDT',
            'RIFUSDT',
            'BTCSTUSDT',
            'TRUUSDT',
            'CKBUSDT',
            'TWTUSDT',
            'FIROUSDT',
            'LITUSDT',
            'SFPUSDT',
            'DODOUSDT',
            'CAKEUSDT',
            'ACMUSDT',
            'BADGERUSDT',
            'FISUSDT',
            'OMUSDT',
            'PONDUSDT',
            'DEGOUSDT',
            'ALICEUSDT',
            'LINAUSDT',
            'PERPUSDT',
            'RAMPUSDT',
            'SUPERUSDT',
            'CFXUSDT',
            'EPSUSDT',
            'AUTOUSDT',
            'TKOUSDT',
            'PUNDIXUSDT',
            'TLMUSDT',
            'BTGUSDT',
            'MIRUSDT',
            'BARUSDT',
            'FORTHUSDT',
            'BAKEUSDT',
            'BURGERUSDT',
            'SLPUSDT',
            'SHIBUSDT',
            'ICPUSDT',
            'ARUSDT',
            'POLSUSDT',
            'MDXUSDT',
            'MASKUSDT',
            'LPTUSDT',
            'XVGUSDT',
            'ATAUSDT',
            'GTCUSDT',
            'TORNUSDT',
            'ERNUSDT',
            'KLAYUSDT',
            'PHAUSDT',
            'BONDUSDT',
            'MLNUSDT',
            'DEXEUSDT',
            'C98USDT',
            'CLVUSDT',
            'QNTUSDT',
            'FLOWUSDT',
            'TVKUSDT',
            'MINAUSDT',
            'RAYUSDT',
            'FARMUSDT',
            'ALPACAUSDT',
            'QUICKUSDT',
            'MBOXUSDT',
            'FORUSDT',
            'REQUSDT',
            'GHSTUSDT',
            'WAXPUSDT',
            'TRIBEUSDT',
            'GNOUSDT',
            'XECUSDT',
            'ELFUSDT',
            'DYDXUSDT',
            'POLYUSDT',
            'IDEXUSDT',
            'VIDTUSDT',
            'USDPUSDT',
            'GALAUSDT',
            'ILVUSDT',
            'YGGUSDT',
            'SYSUSDT',
            'DFUSDT',
            'FIDAUSDT',
            'FRONTUSDT',
            'CVPUSDT',
            'AGLDUSDT',
            'RADUSDT',
            'BETAUSDT',
            'RAREUSDT',
            'LAZIOUSDT',
            'CHESSUSDT',
            'ADXUSDT',
            'AUCTIONUSDT',
            'DARUSDT',
            'BNXUSDT',
            'MOVRUSDT',
            'CITYUSDT',
            'ENSUSDT',
            'KP3RUSDT',
            'QIUSDT',
            'PORTOUSDT',
            'POWRUSDT',
            'VGXUSDT',
            'JASMYUSDT',
            'AMPUSDT',
            'PLAUSDT',
            'PYRUSDT',
            'RNDRUSDT',
            'ALCXUSDT',
            'SANTOSUSDT',
            'MCUSDT',
            'BICOUSDT',
            'FLUXUSDT',
            'FXSUSDT',
            'VOXELUSDT',
            'HIGHUSDT',
            'CVXUSDT',
            'PEOPLEUSDT',
            'OOKIUSDT',
            'SPELLUSDT',
            'USTUSDT',
            'JOEUSDT',
            'ACHUSDT',
            'IMXUSDT',
            'GLMRUSDT',
            'LOKAUSDT',
            'SCRTUSDT',
            'API3USDT',
            'BTTCUSDT',
            'ACAUSDT',
            'ANCUSDT',
            'XNOUSDT',
            'WOOUSDT',
            'ALPINEUSDT',
            'TUSDT',
            'ASTRUSDT',
            'NBTUSDT',
            'GMTUSDT',
            'KDAUSDT',
            'APEUSDT',
            'BSWUSDT',
            'BIFIUSDT',
            'MULTIUSDT',
            'STEEMUSDT'
        ]
        this.client = Binance();

        let initialized = false;
        try
        {
            fs.accessSync('./Crypto/CryptoDatabase.db', fs.constants.F_OK);
            initialized = true;
        }
        catch (err) { }

        this.database = new Datastore({filename: './Crypto/CryptoDatabase.db', autoload: true, onload: (err) => {
            if (err)
                console.log(err.message);
            else if (initialized)
                console.log("CryptoDatabase up and running !");
            else
                this.initializeDatabase().then((val) => console.log("CryptoDatabase up and running !"));
        }});
        this.database.persistence.setAutocompactionInterval(5*1000); // Compacts the database each parameter milliseconds.
    }

    
    /**
     * A method that initializes the database if the database file didn't exist.
     * @returns A promise which resolves in true in case of success.
     */
    initializeDatabase()
    {
        return new Promise((resolve, reject) => {
            
            let allDocs = [];
            
            for (let coin of this.coins)
            {
                let doc = {
                    symbol: coin,
                    history: []
                };
                allDocs.push(doc);
            }

            this.database.insert(allDocs, (err) => {
                if (err)
                {
                    console.log("Couldn't initialize Crypto database. Exiting...");
                    process.exit();
                }
                else
                    console.log("Crypto database initialized !");
                    resolve(true);
            });
        });
    }
    
    updateDatabase()
    {
        let currentDate = new Date();
        let cDay = currentDate.getDate();
        let cMonth = currentDate.getMonth();
        let cYear = currentDate.getFullYear();
        let cHour = currentDate.getHours();
        let startTime_ = new Date(cYear, cMonth, cDay, cHour).valueOf();

        for (let i = 0; i < this.coins.length; i++)
        {
            let coin = this.coins[i];
            let entry = undefined;
            this.client.candles({ symbol: coin, interval: '1h', startTime: startTime_ })
                .then((candle) => {
                    if (candle[0] === undefined) {
                        console.log(coin);
                    }
                    candle = candle[0];
                    entry = {
                        opentime: startTime_,
                        open: candle['open'],
                        high: candle['high'],
                        low: candle['low'],
                        close: candle['close'],
                        volume: candle['volume']
                    }
                    this.database.update({ symbol: coin }, { $push: { history: entry } }, {}, (err, numReplaced) => {
                        if(err)
                            console.log(err);
                    });
                })
                .catch((err) => console.log(err));
        }
    }

    
    /**
     * Gets the candles for a certain symbol.
     * @param {String} symbol_ The symbol of the coin.
     * @returns A promise which resolves in the history of coin's values if successful, in undefined if the symbol
     * is unknown, and in error otherwise.
     */
    getCandle(symbol_)
    {
        return new Promise((resolve, reject) => {
            this.database.find({ symbol: symbol_ }, (err, doc) => {
                if (err)
                    reject(err);
                if (doc.length !== 1)
                    resolve(undefined);
                else
                    resolve(doc[0].history);
            });
        })
    }


    /**
     * Retrieves fromthe API the entire history of candles for a symbol.
     * @param {String} symbol_ The symbol <hich we want to retrieve the history.
     * @returns A promise which resolves in an array of candles if successful and in error otherwise.
     */
    getCandlesSingleCoin(symbol_)
    {
        return new Promise((resolve, reject) => {
            let numberToDisplay = 500;  // Fait varier le nombre de bougies renvoyées (max 500)
            this.client.candles({ symbol: symbol_, interval: '1h' })
                .then((val) => {
                    let result = [];
                    let len = val.length;
                    val = val.slice(-numberToDisplay);
                    for (let element of val)
                    {
                        let toAdd = {
                            candle: {
                                openTime: new Date(element.openTime),
                                open: element.open,
                                high: element.high,
                                low: element.low,
                                close: element.close,
                            },
                            volume: element.volume
                        };
                        result.push(toAdd);
                    }
                    resolve(result);
                })
                .catch((err) => reject(err));
        })
    }

    /**
     * Get the latest price for the given symbol.
     * @param {String} symbol_ The symbol to get the price for.
     * @returns A promise which resolves in the price in case of success and in error otherwise.
     */
    getInstantPrice(symbol_)
    {
        return new Promise((resolve, reject) => {
            this.client.prices( {symbol: symbol_} )
                .then((res) => {

                    resolve(res[symbol_]);
                })
                .catch((err) => reject(err));
        });
    }

    /**
     * Retrieves the wallet current value.
     * @param {Object} wallet The user's wallet with the same fomat as in the database.
     * @returns A promise which resolves in the wallet valuein case of success and in error otherwise.
     */
    getWalletValue(wallet)
    {
        return new Promise((resolve, reject) => {
            let sum = 0;
            let keys = Object.keys(wallet);
            this.client.prices()
                .then((res) => {
                    for (let coin of keys)
                        sum += res[coin] * wallet[coin];
                    resolve(sum);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }
}

exports.default = CryptoDatabase;