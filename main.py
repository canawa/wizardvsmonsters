from fastapi import FastAPI
import secrets
from pydantic import BaseModel
import statistics
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse

app = FastAPI()


result=0
symbols = (
    ['J'] * 100 +    # символы
    ['Q'] * 100 +    # символы
    ['K'] * 100 +     
    ['A'] * 100 +    
    ['🍌'] * 100  +
    ['🍍'] * 100 +
    ['🫐'] * 100  +    
    ['🍐'] * 100  +    
    ['🍓'] * 100 +
    ['⚡'] * 27   +    
    ['🔥'] * 20 +
    ['🚪'] * 7      
)

app.mount("/static", StaticFiles(directory="static", html=True), name="static") # при переходе на главную страничку откроется папка статик
@app.get('/')
def read_index():
    return FileResponse('static/index.html')


shutterMultiplier = (
    [2] * 500 +   # иксы для штор
    [3] * 400 +
    [5] * 100 +
    [10] * 40 +  
    [25] * 10 +
    [50] * 2 + 
    [75] * 1
      
)
def gameLogic(bet,result,counter,payout):
        gameResults = ''
        row1=result[:5]
        row2=result[5:10]
        row3=result[10:15]
        row4=result[15:20]
        row5=result[20:25]
        row6=result[25:]
        if row1.count('🔥') > 1:
            z = row1.index('🔥')
            row1[z] = row1[z].replace('🔥', 'Q', 1)
        if row2.count('🔥') > 1:
            z = row2.index('🔥')
            row2[z] = row2[z].replace('🔥', 'Q', 1)
        if 3.count('🔥') > 1:
            z = row3.index('🔥')
            row3[z] = row3[z].replace('🔥', 'Q', 1)
        if 4.count('🔥') > 1:
            z = row4.index('🔥')
            row4[z] = row4[z].replace('🔥', 'Q', 1)
        if row5.count('🔥') > 1:
            z = row5.index('🔥')
            row5[z] = row5[z].replace('🔥', 'Q', 1)
        if row6.count('🔥') > 1:
            z = row6.index('🔥')
            row6[z] = row6[z].replace('🔥', 'Q', 1)
        if row1.count('⚡')>1:
            z = row1.index('⚡')
            row1[z]=row1[z].replace('⚡','J',1)
        if row2.count('⚡')>1:
            z = row2.index('⚡')
            row2[z]=row2[z].replace('⚡','J',1)
        if row3.count('⚡')>1:
            z = row3.index('⚡')
            row3[z]=row3[z].replace('⚡','J',1)
        if row4.count('⚡')>1:
            z = row4.index('⚡')
            row4[z]=row4[z].replace('⚡','J',1)
        if row5.count('⚡')>1:
            z = row5.index('⚡')
            row5[z]=row5[z].replace('⚡','J',1)
        if row6.count('⚡')>1:
            z = row6.index('⚡')
            row6[z]=row6[z].replace('⚡','J',1)
            

        if result.count('🔥')>=1:
            multiplier = 2*result.count('🔥')
        else:
            multiplier = 1

        if result.count('J')>=8:
            payout=(payout+bet*0.025*result.count('J'))
            counter=counter+1
            gameResults = gameResults + 'Сыграли J ' + str(payout)
        if result.count('Q')>=8:
            payout=(payout+bet*0.05*result.count('Q'))
            counter=counter+1
            gameResults = gameResults + 'Сыграли Q ' + str(payout)
        if result.count('K')>=8:
            payout=(payout+bet*0.10*result.count('K'))
            counter=counter+1
            gameResults = gameResults + 'Сыграли K ' + str(payout)
        if result.count('A')>=7:
            
            payout=(payout+bet*0.12*result.count('A'))
            counter=counter+1
            gameResults = gameResults + 'Сыграли A' + str(payout)
        if result.count('🍌')>=7:
            
            payout=(payout+bet*0.14*result.count('🍌'))
            counter=counter+1
            gameResults = gameResults + 'Сыграли 🍌' +str( payout)
        if result.count('🍍')>=7:
            
            payout=(payout+bet*0.2*result.count('🍍'))
            counter=counter+1
            gameResults = gameResults + 'Сыграли 🍍' +str( payout)
        if result.count('🫐')>=7:
            
            payout=(payout+bet*0.24*result.count('🫐'))
            counter=counter+1
            gameResults = gameResults + 'Сыграли 🫐' + str(payout)
        if result.count('🍐')>=7:
            payout=(payout+bet*0.28*result.count('🍐'))
            
            counter=counter+1
            gameResults = gameResults + 'Сыграли 🍐 ' + str(payout)
        if result.count('🍓')>=7:
            
            payout=(payout+bet*0.35*result.count('🍓'))
            counter=counter+1
            gameResults = gameResults + 'Сыграли 🍓' + str(payout)
        

        return {'payout':payout, 'counter':counter, 'gameResults': gameResults, 'row1':row1,'row2':row2,'row3':row3,'row4':row4, 'row5':row5,'row6':row6}
        

@app.get('/api/bonus')
def bonusGame(bet:int,counter:int,gameResults: str):
    multiplier=1
    payout = 0
    noWin=0
    spinsAmount = 10
    shutterPos=[]
    overallPayout=0
    for z in range(spinsAmount):
        result=[]
        payout=0
        for i in range(0,31):
            result.append(secrets.choice(symbols))
        for pos in range(len(shutterPos)):
            result[shutterPos[pos]]='🚪'
        game = gameLogic(bet,result,counter,payout)
        payout=game['payout']
        counter=game['counter']
        gameResults = game['gameResults']
        if result.count('🚪')>=1:
            for i in range(result.count('🚪')):
                multiplier = multiplier + secrets.choice(shutterMultiplier)
            payout=payout*multiplier
            shutterPos.append(result.index('🚪'))

        else:
            payout=payout*multiplier
        if result.count('⚡')>=3:
            spinsAmount = spinsAmount+2
        overallPayout=overallPayout+payout
    if overallPayout==0:
        noWin=noWin+1
    return {'payout':overallPayout, 'counter':counter,'gameResults':gameResults,'noWinFreeSpin': noWin }
    


bonusCount =0
@app.get('/api/spin')
def spinTest():
    
    bigWinCount=0
    bet = 100
    hitFreq=0
    counter = 0
    result=[]
    multiplier=1
    payout=0
    bonusCount=0
    for i in range(0,30):
        result.append(secrets.choice(symbols))
    
    game=gameLogic(bet,result,counter,payout)
    payout=game['payout']
    counter=game['counter']
    gameResults = game['gameResults']
    row1=game['row1']
    row2=game['row2']
    row3=game['row3']
    row4=game['row4']
    row5=game['row5']
    row6=game['row6']
    if result.count('🚪')>=1:
        for i in range(result.count('🚪')):
            multiplier = multiplier + secrets.choice(shutterMultiplier)
        payout=payout*multiplier
    else:
        payout=payout*multiplier
    if result.count('⚡')>=4:
        bonusCount += 1 
        payout = payout + bonusGame(bet,counter,gameResults)['payout']
        gameResults ='Сыграла БОНУСКА 💵💵' + gameResults  + str(payout)
    else:
        bonusCount=0
    if payout>=bet*10:
        bigWinCount = bigWinCount+1
    if len(gameResults) > 3:
            hitFreq = hitFreq+1
    
    return {'payout':payout,'сколько символов сыграло': counter, 'bigWinCount': bigWinCount, 'hitFrequency':hitFreq, 'bonusCount': bonusCount, 'symbolsPayout': gameResults, 'multiplier':multiplier, 'row1': row1,'row2':row2,'row3':row3,'row4':row4,'row5':row5,'row6':row6}
    





@app.get('/api/stats')
def stats():
    rtp=[]
    bonus=[]
    hit=[]
    noWin=[]
    medianWin=[]
    maxBonusWin=[]
    bigWin=[]
    bet=100
    for _ in range(1,2000000):
        spinResult = spinTest()
        rtp.append(spinResult['payout'])
        bonus.append(spinResult['bonusCount']) # много че возвращает но обращаемся ток к бонус каунт
        hit.append(spinResult['hitFrequency'])
        bigWin.append(spinResult['bigWinCount'])
    for _ in range(1,100000):
        bonusResult=bonusGame(100,0,'')
        noWin.append(bonusResult['noWinFreeSpin'])
        medianWin.append(bonusResult['payout']/bet)
        maxBonusWin.append(bonusResult['payout']/bet)
    return {
        'RTP': str(sum(rtp)/len(rtp))[:5]+'%',
        'BONUS CHANCE': str(float(str(sum(bonus)/len(bonus))[:5])*100)[:5]+'%',
        'HIT FREQUENCY': str(float(str(sum(hit)/len(hit))[:5])*100)[:5]+'%',
        'NOWINFS': str(float(str(sum(noWin)/len(noWin))[:5])*100)[:5]+'%',
        'MEDIAN FS WIN': str(statistics.median(medianWin))+'x',
        'MAX FS WIN': str((max(maxBonusWin)))+'x',
        'BIG WIN (10X+)':  str(float(str(sum(bigWin)/len(bigWin))[:5])*100)[:5]+'%',
    }


class Balance(BaseModel):
    balance: int
#
# @app.post('/')
# def create_balance(newBalance = Balance):
#     return {'successs':True}
#
