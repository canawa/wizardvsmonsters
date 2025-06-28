from fastapi import FastAPI
import secrets
from pydantic import BaseModel, Field
import statistics
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse
import math

app = FastAPI()
payout=0
bet = 1000
result=0
bonusSymbols = (
    ['J'] * 100 +    # символы
    ['Q'] * 100 +    # символы
    ['K'] * 100 +     
    ['A'] * 100 +    
    ['🍌'] * 100  +
    ['🍍'] * 100 +
    ['🫐'] * 100  +    
    ['🍐'] * 100  +    
    ['🍓'] * 100 +    
    ['🔥'] * 20 +
    ['🚪'] * 12      
)
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
    ['⚡'] * 270   +    # 27
    ['🔥'] * 20 +
    ['🚪'] * 7      
)

# Дополнительно, если звуки запрашиваются как /sounds/...
app.mount("/sounds", StaticFiles(directory="static/sounds"), name="sounds")

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
        if row3.count('🔥') > 1:
            z = row3.index('🔥')
            row3[z] = row3[z].replace('🔥', 'Q', 1)
        if row4.count('🔥') > 1:
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
        

@app.get('/api/bonusSpin')
def bonusSpin(counter: int = 0, gameResults: str = ""):
    """
    Обрабатывает один спин бонусной игры
    """
    global bet  # используем глобальную переменную bet
    global shutterPos  # делаем shutterPos глобальной переменной
    multiplier = 1
    payout = 0
    
    # Инициализируем shutterPos только если она еще не существует
    if 'shutterPos' not in globals():
        shutterPos = []
    
    result = []
    
    # Генерируем результат для текущего спина
    for i in range(0,31):
        result.append(secrets.choice(bonusSymbols))
    
    # Размещаем шторы на позициях (пока пустой список)
    for pos in range(len(shutterPos)):
        result[shutterPos[pos]]='🚪'
    
    # Применяем игровую логику
    game = gameLogic(bet, result, counter, payout)
    payout = game['payout']
    counter = game['counter']
    gameResults = game['gameResults']
    
    # Обрабатываем множители от штор
    if result.count('🚪')>=1:
        for i in range(result.count('🚪')):
            multiplier = multiplier + secrets.choice(shutterMultiplier)
        payout = payout * multiplier
        shutterPos.append(result.index('🚪'))
    else:
        payout = payout * multiplier
    
    # Проверяем на дополнительные спины от ⚡
    additionalSpins = 0
    if result.count('⚡')>=3:
        additionalSpins = 2
    
    return {
        'payout': payout, 
        'counter': counter, 
        'gameResults': gameResults, 
        'row1': game['row1'],
        'row2': game['row2'],
        'row3': game['row3'],
        'row4': game['row4'],
        'row5': game['row5'],
        'row6': game['row6'],
        'multiplier': multiplier,
        'additionalSpins': additionalSpins,
        'shutterPos': shutterPos
    }
    


bonusCount =0
@app.get('/api/spin')
def spinTest():
    global bonusSpinPayout
    bonusSpinPayout=0
    global userBalance
    if userBalance<bet:
        userBalance=100000
    bigWinCount=0
    hitFreq=0
    counter = 0
    result=[]
    multiplier=1
    global payout
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
        # Сбрасываем позиции штор при начале нового бонусного раунда
        global shutterPos
        shutterPos = []
        # Не запускаем бонусную игру сразу, а возвращаем флаг
        gameResults ='Сыграла БОНУСКА 💵💵' + gameResults
    else:
        bonusCount=0
    if payout>=bet*10:
        bigWinCount = bigWinCount+1
    if len(gameResults) > 3:
            hitFreq = hitFreq+1
    
    return {'payout':payout,'сколько символов сыграло': counter, 'bigWinCount': bigWinCount, 'hitFrequency':hitFreq, 'bonusCount': bonusCount, 'symbolsPayout': gameResults, 'multiplier':multiplier, 'row1': row1,'row2':row2,'row3':row3,'row4':row4,'row5':row5,'row6':row6}
    
userBalance = 100000
@app.get('/api/getBalanceOnOpen')
def getBalanceOnOpen():
    global userBalance
    global payout
    return {'balance': userBalance, 'payout': math.floor(payout)}

@app.get('/api/balance')
def balance():
    global userBalance
    global payout
    global bonusSpinPayout
    beforeEndOfTheSpin = userBalance - bet
    userBalance = userBalance - bet + payout + bonusSpinPayout
    print(type(payout))
    return {'balance': userBalance, 'beforeEndOfTheSpin': beforeEndOfTheSpin, 'payout': math.floor(payout)}



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
    
    # Симуляция бонусной игры для статистики
    for _ in range(1,100000):
        totalPayout = 0
        spinsAmount = 10
        shutterPos = []
        
        for spin in range(spinsAmount):
            # Симулируем один спин бонусной игры
            result = []
            for i in range(0,31):
                result.append(secrets.choice(symbols))
            
            # Размещаем шторы
            for pos in range(len(shutterPos)):
                result[shutterPos[pos]]='🚪'
            
            # Применяем игровую логику
            game = gameLogic(bet, result, 0, 0)
            spinPayout = game['payout']
            
            # Обрабатываем множители от штор
            multiplier = 1
            if result.count('🚪')>=1:
                for i in range(result.count('🚪')):
                    multiplier = multiplier + secrets.choice(shutterMultiplier)
                spinPayout = spinPayout * multiplier
                shutterPos.append(result.index('🚪'))
            else:
                spinPayout = spinPayout * multiplier
            
            totalPayout += spinPayout
            
            # Проверяем на дополнительные спины от ⚡
            if result.count('⚡')>=3:
                spinsAmount = spinsAmount+2
        
        noWin.append(0)  # Пока не реализована логика noWin
        medianWin.append(totalPayout/bet)
        maxBonusWin.append(totalPayout/bet)
    
    return {
        'RTP': str(sum(rtp)/len(rtp))[:5]+'%',
        'BONUS CHANCE': str(float(str(sum(bonus)/len(bonus))[:5])*100)[:5]+'%',
        'HIT FREQUENCY': str(float(str(sum(hit)/len(hit))[:5])*100)[:5]+'%',
        'NOWINFS': str(float(str(sum(noWin)/len(noWin))[:5])*100)[:5]+'%',
        'MEDIAN FS WIN': str(statistics.median(medianWin))+'x',
        'MAX FS WIN': str((max(maxBonusWin)))+'x',
        'BIG WIN (10X+)':  str(float(str(sum(bigWin)/len(bigWin))[:5])*100)[:5]+'%',
    }




class betSchema(BaseModel):
    bet: float = Field(ge=0.20, le=10000) # больше 0.20 и меньше 10000. Пишем валидацию pyDantic

@app.post('/api/setBet')
def setBet(request: betSchema): # принимаем согласно схеме betSchema
    global bet
    bet = request.bet # присваиваем глобальной переменной bet значение из запроса
    return {'newBet': bet} # доп отладка на клиента 

class bonusSpinPayoutSchema(BaseModel):
    bonusSpinPayout: float = Field(ge=0)

@app.post('/api/bonusSpinPayout')
def bonusSpinPayout(request: bonusSpinPayoutSchema):
    global bonusSpinPayout
    bonusSpinPayout = request.bonusSpinPayout
    balance()
