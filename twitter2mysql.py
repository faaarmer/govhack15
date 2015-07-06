from pprint import pprint
import tweepy
import json
import time
import _mysql
import sys

# Authentication details. To  obtain these visit dev.tweetter.com
consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''
# mysql details.
db_host = ''
db_user = ''
db_password = ''
db_db = ''

# This is the listener, resposible for receiving data
class StdOutListener(tweepy.StreamListener):
    def on_data(self, data):
        # Twitter returns data in JSON format - we need to decode it first
        tweet = json.loads(data)

        # Also, we convert UTF-8 to ASCII ignoring all bad characters sent by users
        if not tweet['geo'] is None:
           if tweet['geo']['type'] == "Point":
              self.db_insert(tweet)
        return True

    def on_error(self, status):
        print status

    def db_insert(self, tweet):
       try:
          sql = "INSERT INTO tweets (twitter_handle, lon, lat, msg, timestamp)"
          handle = con.escape_string(tweet['user']['screen_name'])
          lon, lat = tweet['geo']['coordinates'] # type must be Point
          # SQL & javascript injection security issue here, FIXME in production
          # I18N issue here, FIXME in production
          msg = con.escape_string(tweet['text'].encode('ascii', 'ignore'))
          values = "'%s', %s, %s, '%s', '%s'" % (handle, lon, lat, msg,
          time.strftime('%Y-%m-%d %H:%M:%S'))
          sql += " VALUES (%s);" % values
          con.query(sql)
          result = con.use_result()
          print("."),

       except _mysql.Error, e:
         print "Error %d: %s" % (e.args[0], e.args[1])
         sys.exit(1)

if __name__ == '__main__':
    l = StdOutListener()
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    # There are different kinds of streams: public stream, user stream, multi-user streams
    stream = tweepy.Stream(auth, l)
    print("Connected to twitter")
    # [153,-27.5,153.02,-27.49] would roughly map to UQ
    # [152.7,-27.7, 153.32,-27.36] would roughly map to Brisbane
    con = _mysql.connect(db_host, db_user, db_password, db_db)
    stream.filter(locations=[109.6, -44, 154, -12.4])

        
