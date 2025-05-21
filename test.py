class Cat:
    color = None
    isAlive = 'yes'
    name = None
    isHappy = None

    def set_data(self):
        
cat1 = Cat()
cat1.name='Barsik'
cat1.isHappy=True
print(cat1.__dict__)
cat2 = Cat()
cat2.name = 'Жопен'
cat2.isHappy = False
cat2.pidor = False 
print(cat2.__dict__)
print(cat1.name, cat2.name)