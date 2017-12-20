/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @module TAutoReconnect
 *
 * @description This module allow server to auto reconnect to the database.
 */

/**
 * The module
 * @param mongoose - The database to connect
 * @param config - The config to apply for database connection
 * @returns {*}
 */
module.exports = function (mongoose, config) {
  // CONNECTION EVENTS
  var timer = null

  /**
   * Connect to Mongo DataBase with the given uri
   */
  function connectTo(url)
  {
    mongoose.connect(url, {useMongoClient: true})
  }

  /**
   * startAutoConnect
   */
  function startAutoConnect () {
    if (!timer) {
      console.log('Démarrage de la reconnexion automatique...')
      timer = setInterval(function () {
        mongoose.connect(config.database_url, {useMongoClient: true})
      }, config.auto_reconnect_timeout)
    }
  }

  /**
   * stopAutoConnect
   */
  function stopAutoConnect () {
    if (timer) {
      console.log('Arret de la reconnexion automatique...')
      clearInterval(timer)
      timer = null
    }
  }

  /**
   * When trying to connect to the database
   */
  function onConnecting() {
    console.log('Tentative de connexion à ' + config.database_url)
  }

  /**
   * When successfully connected
   */
  function onConnected() {
    console.log('Connexion à la base de données: Ok !')
    stopAutoConnect()
  }

  /**
   * If the connection is open
   */
  function onOpen() {
    console.log('La connexion à la base de données est ouverte !')
  }

  /**
   * When disconnecting database
   */
  function onDisconnecting() {
    console.log('Tentative de déconnexion à ' + config.database_url)
  }

  /**
   * When the connection is disconnected
   */
  function onDisconnected() {
    console.log('Déconnexion à la base de données: Ok !')
  }

  /**
   * If the connection is reconnected
   */
  function onReconnected() {
    console.log('Reconnexion à la base de données...')
    stopAutoConnect()
  }

  /**
   * If the connection is close
   */
  function onClose() {
    console.log('Connexion à la base de données fermé !')
    startAutoConnect()
  }

  /**
   * If the connection throws an error
   * @param error - A mongoose error
   */
  function onError(error) {
    console.error('Connexion à la base de données: Erreur...')
    console.error(error.message)
    startAutoConnect()
  }

  /* EVENTS */
  mongoose.connection
    .on('connecting', onConnecting)
    .on('connected', onConnected)
    .on('open', onOpen)
    .on('disconnecting', onDisconnecting)
    .on('disconnected', onDisconnected)
    .on('reconnected', onReconnected)
    .on('close', onClose)
    .on('error', onError)

  /* CONNECT TO DATABASE */
  connectTo(config.database_url)
//  mongoose.connect(config.database_url)

  return mongoose
}
