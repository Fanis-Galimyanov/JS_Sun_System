// JavaScript Document

//-----------------------initialization-------------------------------------------//

const gravit = 6.67384e-11;
const time_step=10;
var time_end=9*12*30*24*3600;

var number_planets = 5, length_array = 100, max_moveing = 6.371e+6, time_glob = 0,
stop = false, hour = 0, day = 0, month = 0, year = 0, mash_planet = 5, mash = 1e+7;

var rx = [], ry = [], r = [], a = [];
		for (var i = 0; i < length_array; i++)
		{
			rx[i] = [];
			ry[i] = [];
			r[i] = [];
			a[i] = [];
			
			for (var j = 0; j < length_array; j++)
			{
				rx[i][j] = 0;
				ry[i][j] = 0;
				r[i][j] = 0;
				a[i][j] = 0;
			}
		}

var radius_planeta = [], plotnost_planeta = [] , massa = [], Sx = [], Sy = [],
	Vx = [], Vy = [], ax = [], ay = [], F = [];
		for (var i = 0; i < length_array; i++)
		{
				radius_planeta[i] = 0;
				plotnost_planeta[i] = 0;
				massa[i] = 0;
				Sx[i] = 0;
				Sy[i] = 0;
				Vx[i] = 0;
				Vy[i] = 0;
				ax[i] = 0;
				ay[i] = 0;
				F[i] = 0;
		}
		
for (var i = 0; i < number_planets; i++)
		{
				radius_planeta[i] = 6.371e+6;
				plotnost_planeta[i] = 5.51e+3;
				massa[i] = 5.9742e+24;
		}

Sx[0] = 100 * mash;    Sy[0] = 100 * mash;	

Sx[1] = 1000 * mash;   Sy[1] = 100 * mash;

Sx[2] = 100 * mash;    Sy[2] = 700 * mash;

Sx[3] = 1000 * mash;    Sy[3] = 700 * mash;

Sx[4] = 500 * mash;    Sy[4] = 500 * mash;	

 
  d0.style.height = 2*mash_planet*radius_planeta[0]/mash;
  d0.style.width = 2*mash_planet*radius_planeta[0]/mash;
  
  d1.style.height = 2*mash_planet*radius_planeta[1]/mash; 
  d1.style.width = 2*mash_planet*radius_planeta[1]/mash;
  
  d2.style.height = 2*mash_planet*radius_planeta[2]/mash; 
  d2.style.width = 2*mash_planet*radius_planeta[2]/mash;
  
  d3.style.height = 2*mash_planet*radius_planeta[3]/mash; 
  d3.style.width = 2*mash_planet*radius_planeta[3]/mash;
  
  d4.style.height = 2*mash_planet*radius_planeta[4]/mash; 
  d4.style.width = 2*mash_planet*radius_planeta[4]/mash;

  
  d0.style.left = (Sx[0]-radius_planeta[0]*mash_planet)/mash + 'px';
  d0.style.top = (Sy[0]-radius_planeta[0]*mash_planet)/mash + 'px';
  
  d1.style.left = (Sx[1]-radius_planeta[1]*mash_planet)/mash + 'px';
  d1.style.top = (Sy[1]-radius_planeta[1]*mash_planet)/mash + 'px';
  
  d2.style.left = (Sx[2]-radius_planeta[2]*mash_planet)/mash + 'px';
  d2.style.top = (Sy[2]-radius_planeta[2]*mash_planet)/mash + 'px';
  
  d3.style.left = (Sx[3]-radius_planeta[3]*mash_planet)/mash + 'px';
  d3.style.top = (Sy[3]-radius_planeta[3]*mash_planet)/mash + 'px';
  
  d4.style.left = (Sx[4]-radius_planeta[4]*mash_planet)/mash + 'px';
  d4.style.top = (Sy[4]-radius_planeta[4]*mash_planet)/mash + 'px';
		
//---------------------end initialization-----------------------------------//

//------------------begin--------------------------------------------------//

var tormoz = function(i)
{
	var x1, y1, x, y, moveing, speed, max_speed;
	
	x = Sx[i];
	y = Sy[i];
	x1 = Sx[i] + Vx[i] * time_step;
	y1 = Sy[i] + Vy[i] * time_step;
	moveing = Math.pow(Math.pow((x1-x),2)+Math.pow((y1-y),2),0.5);
	speed = moveing/time_step;
	max_speed = max_moveing/time_step;
	if(speed > max_speed)
		{
		Vx[i] = Vx[i]*max_speed/speed;
		Vy[i] = Vy[i]*max_speed/speed;
		}
	
}

var barelu = function()
{ var ara;
	for (var i = 0; i < number_planets; i++)
		{
		for (var j = 0; j < number_planets; j++)
			{
			if ((i != j) && (massa[i] > 0) && (massa[j] > 0))
				{
				ara = 
				Math.pow(Math.pow((Sx[j]-Sx[i]),2)+Math.pow((Sy[j]-Sy[i]),2),0.5);
				if (ara < (radius_planeta[i]+radius_planeta[j]))
					{
					Vx[i] = (massa[i] * Vx[i] + massa[j] * Vx[j])/(massa[i]+massa[j]);
					Vy[i] = (massa[i] * Vy[i] + massa[j] * Vy[j])/(massa[i]+massa[j]);
					massa[i] = massa[i] + massa[j];
					
					if((radius_planeta[i] > radius_planeta[j]) && 
						(plotnost_planeta[i] < plotnost_planeta[j]))
					{
					plotnost_planeta[i]	=
						(3*massa[i])/(4*3.14*Math.pow(radius_planeta[i],3));
					}
					else
					{
						if((radius_planeta[j] > radius_planeta[i]) && 
							(plotnost_planeta[j] < plotnost_planeta[i]))
								{
								plotnost_planeta[i]	=
								(3*massa[i])/(4*3.14*Math.pow(radius_planeta[j],3));
								}
						else
							{
							plotnost_planeta[i] = 
								(plotnost_planeta[i] + plotnost_planeta[j])*0.5;
							}
					}
				
					Vx[j] = 0;
					Vy[j] = 0;
					massa[j] = 0;
					plotnost_planeta[j] = 0;
					Sx[j] = 0;
					Sy[j] = 0;
					}			
				}
			}	
		}		
}


var sanau = function()
{  
	for(var i=0; i<number_planets; i++)
		{		
		if((plotnost_planeta[i] > 0) && (massa[i] > 0))
			{
				radius_planeta[i] = 
					Math.pow(((3*massa[i])/(4*3.14*plotnost_planeta[i])),0.3333333);
			}
		else
			{
				radius_planeta[i] = 0;
			}	
		}
	
	barelu()
   
	for (var i = 0; i < number_planets; i++)
		{
		for (var j = 0; j < number_planets; j++)
			{
			if ((i != j) && (massa[i] > 0) && (massa[j] > 0))
				{
					rx[i][j] = Sx[j] - Sx[i];
					ry[i][j] = Sy[j] - Sy[i];
					r[i][j]=Math.pow(Math.pow(rx[i][j],2)+Math.pow(ry[i][j],2),0.5);
					a[i][j]=gravit*massa[j]/Math.pow(r[i][j],2);
					ax[i] = ax[i] + (a[i][j] * rx[i][j]/r[i][j]);
					ay[i] = ay[i] + (a[i][j] * ry[i][j]/r[i][j]);
				}
			}
		if((plotnost_planeta[i] > 0) && (massa[i] > 0))
			{
				Vx[i] = Vx[i] + ax[i] * time_step;
				Vy[i] = Vy[i] + ay[i] * time_step;
			}	
		}	
		
	for(var i=0; i<number_planets; i++)
		{		
		if((plotnost_planeta[i] > 0) && (massa[i] > 0))
			{
				Sx[i] = Sx[i] + Vx[i] * time_step;
				Sy[i] = Sy[i] + Vy[i] * time_step;
			}	
		}
	
	time_glob++;
   
	for (var i = 0; i < number_planets; i++)
		{
			F[i]=Math.pow(Math.pow(ax[i],2)+Math.pow(ay[i],2),0.5)*massa[i];
			
			ax[i] = 0;
			ay[i] = 0;
		}
  
}   
  
 
var animation = function()
{ 
  d0.style.height = 2*mash_planet*radius_planeta[0]/mash;
  d0.style.width = 2*mash_planet*radius_planeta[0]/mash;
  
  d1.style.height = 2*mash_planet*radius_planeta[1]/mash; 
  d1.style.width = 2*mash_planet*radius_planeta[1]/mash;
  
  d2.style.height = 2*mash_planet*radius_planeta[2]/mash; 
  d2.style.width = 2*mash_planet*radius_planeta[2]/mash;
  
  d3.style.height = 2*mash_planet*radius_planeta[3]/mash; 
  d3.style.width = 2*mash_planet*radius_planeta[3]/mash;
  
  d4.style.height = 2*mash_planet*radius_planeta[4]/mash; 
  d4.style.width = 2*mash_planet*radius_planeta[4]/mash;
  
  d5.style.height = 2*mash_planet*radius_planeta[5]/mash; 
  d5.style.width = 2*mash_planet*radius_planeta[5]/mash;
  
  d6.style.height = 2*mash_planet*radius_planeta[6]/mash; 
  d6.style.width = 2*mash_planet*radius_planeta[6]/mash;
  
  d7.style.height = 2*mash_planet*radius_planeta[7]/mash; 
  d7.style.width = 2*mash_planet*radius_planeta[7]/mash;
  
  d8.style.height = 2*mash_planet*radius_planeta[8]/mash; 
  d8.style.width = 2*mash_planet*radius_planeta[8]/mash;
  
  d9.style.height = 2*mash_planet*radius_planeta[9]/mash; 
  d9.style.width = 2*mash_planet*radius_planeta[9]/mash;
  
  d10.style.height = 2*mash_planet*radius_planeta[10]/mash; 
  d10.style.width = 2*mash_planet*radius_planeta[10]/mash;
  
  d11.style.height = 2*mash_planet*radius_planeta[11]/mash; 
  d11.style.width = 2*mash_planet*radius_planeta[11]/mash;
  
  d12.style.height = 2*mash_planet*radius_planeta[12]/mash; 
  d12.style.width = 2*mash_planet*radius_planeta[12]/mash;
  
  d13.style.height = 2*mash_planet*radius_planeta[13]/mash; 
  d13.style.width = 2*mash_planet*radius_planeta[13]/mash;
  
  d14.style.height = 2*mash_planet*radius_planeta[14]/mash; 
  d14.style.width = 2*mash_planet*radius_planeta[14]/mash;
  
  d15.style.height = 2*mash_planet*radius_planeta[15]/mash; 
  d15.style.width = 2*mash_planet*radius_planeta[15]/mash;
  
  d16.style.height = 2*mash_planet*radius_planeta[16]/mash; 
  d16.style.width = 2*mash_planet*radius_planeta[16]/mash;
  
  d17.style.height = 2*mash_planet*radius_planeta[17]/mash; 
  d17.style.width = 2*mash_planet*radius_planeta[17]/mash;
  
  d18.style.height = 2*mash_planet*radius_planeta[18]/mash; 
  d18.style.width = 2*mash_planet*radius_planeta[18]/mash;
  
  d19.style.height = 2*mash_planet*radius_planeta[19]/mash; 
  d19.style.width = 2*mash_planet*radius_planeta[19]/mash;
  
  d20.style.height = 2*mash_planet*radius_planeta[20]/mash; 
  d20.style.width = 2*mash_planet*radius_planeta[20]/mash;
  
  

  d0.style.left = (Sx[0]-radius_planeta[0]*mash_planet)/mash + 'px';
  d0.style.top = (Sy[0]-radius_planeta[0]*mash_planet)/mash + 'px';
  
  d1.style.left = (Sx[1]-radius_planeta[1]*mash_planet)/mash + 'px';
  d1.style.top = (Sy[1]-radius_planeta[1]*mash_planet)/mash + 'px';
  
  d2.style.left = (Sx[2]-radius_planeta[2]*mash_planet)/mash + 'px';
  d2.style.top = (Sy[2]-radius_planeta[2]*mash_planet)/mash + 'px';
  
  d3.style.left = (Sx[3]-radius_planeta[3]*mash_planet)/mash + 'px';
  d3.style.top = (Sy[3]-radius_planeta[3]*mash_planet)/mash + 'px';
  
  d4.style.left = (Sx[4]-radius_planeta[4]*mash_planet)/mash + 'px';
  d4.style.top = (Sy[4]-radius_planeta[4]*mash_planet)/mash + 'px';
  
  d5.style.left = (Sx[5]-radius_planeta[5]*mash_planet)/mash + 'px';
  d5.style.top = (Sy[5]-radius_planeta[5]*mash_planet)/mash + 'px';
  
  d6.style.left = (Sx[6]-radius_planeta[6]*mash_planet)/mash + 'px';
  d6.style.top = (Sy[6]-radius_planeta[6]*mash_planet)/mash + 'px';
  
  d7.style.left = (Sx[7]-radius_planeta[7]*mash_planet)/mash + 'px';
  d7.style.top = (Sy[7]-radius_planeta[7]*mash_planet)/mash + 'px';
  
  d8.style.left = (Sx[8]-radius_planeta[8]*mash_planet)/mash + 'px';
  d8.style.top = (Sy[8]-radius_planeta[8]*mash_planet)/mash + 'px';
  
  d9.style.left = (Sx[9]-radius_planeta[9]*mash_planet)/mash + 'px';
  d9.style.top = (Sy[9]-radius_planeta[9]*mash_planet)/mash + 'px';
  
  d10.style.left = (Sx[10]-radius_planeta[10]*mash_planet)/mash + 'px';
  d10.style.top = (Sy[10]-radius_planeta[10]*mash_planet)/mash + 'px';
  
  d11.style.left = (Sx[11]-radius_planeta[11]*mash_planet)/mash + 'px';
  d11.style.top = (Sy[11]-radius_planeta[11]*mash_planet)/mash + 'px';
  
  d12.style.left = (Sx[12]-radius_planeta[12]*mash_planet)/mash + 'px';
  d12.style.top = (Sy[12]-radius_planeta[12]*mash_planet)/mash + 'px';
  
  d13.style.left = (Sx[13]-radius_planeta[13]*mash_planet)/mash + 'px';
  d13.style.top = (Sy[13]-radius_planeta[13]*mash_planet)/mash + 'px';
  
  d14.style.left = (Sx[14]-radius_planeta[14]*mash_planet)/mash + 'px';
  d14.style.top = (Sy[14]-radius_planeta[14]*mash_planet)/mash + 'px';
  
  d15.style.left = (Sx[15]-radius_planeta[15]*mash_planet)/mash + 'px';
  d15.style.top = (Sy[15]-radius_planeta[15]*mash_planet)/mash + 'px';
  
  d16.style.left = (Sx[16]-radius_planeta[16]*mash_planet)/mash + 'px';
  d16.style.top = (Sy[16]-radius_planeta[16]*mash_planet)/mash + 'px';
  
  d17.style.left = (Sx[17]-radius_planeta[17]*mash_planet)/mash + 'px';
  d17.style.top = (Sy[17]-radius_planeta[17]*mash_planet)/mash + 'px';
  
  d18.style.left = (Sx[18]-radius_planeta[18]*mash_planet)/mash + 'px';
  d18.style.top = (Sy[18]-radius_planeta[18]*mash_planet)/mash + 'px';
  
  d19.style.left = (Sx[19]-radius_planeta[19]*mash_planet)/mash + 'px';
  d19.style.top = (Sy[19]-radius_planeta[19]*mash_planet)/mash + 'px';
  
  d20.style.left = (Sx[20]-radius_planeta[20]*mash_planet)/mash + 'px';
  d20.style.top = (Sy[20]-radius_planeta[20]*mash_planet)/mash + 'px';
 
}

var time = function()
{ var second = 0; 

hour = 0; day = 0; month = 0; year = 0;

second = time_glob*time_step;

while(second > 3599)
	{
	hour++;
	second = second - 3600;
	}

while(hour > 23)
	{
	day++;
	hour = hour - 24;
	}

while(day > 29)
	{
	month++;
	day = day - 30;
	}

while(month > 11)
	{
	year++;
	month = month - 12;
	}

document.myform.hour.value = hour;
document.myform.day.value = day;
document.myform.month.value = month;
document.myform.year.value = year;
	
}



function btnClick1()
    {  
	if(number_planets < 20)
		{
			Sx[number_planets] = (+myform.x.value)*mash;
			Sy[number_planets] = (+myform.y.value)*mash;
			massa[number_planets] = +myform.m.value;
			plotnost_planeta[number_planets] = +myform.p.value;
			Vx[number_planets] = +myform.vx.value; 
			Vy[number_planets] = +myform.vy.value;
	  
			number_planets++;
	  }
	else
	  {
			alert("Достигнут лимит численности элементов.");
	  }
    } 
 
 // d1.onclick = function() {
  function btnClick2()
    {
	  stop = false;
	  
      var start = Date.now(); // сохранить время начала

      var timer = setInterval(function() {
        // вычислить сколько времени прошло из opts.duration
        var timePassed = Date.now() - start;
        
		for(var i=0; i<1000; i++)
		 {
			sanau()
		 }
		 
		animation()
		
		time()

        //if (timePassed > 17000) clearInterval(timer);
		if(((time_glob*time_step)>time_end) || stop) clearInterval(timer);

      }, 1);
    }
	
function btnClick3()
    {  
	  stop = true;
    } 

	
	
function btnClick4()
 {  
	mash = +myform.mash.value;
	  
	mash_planet = 5*mash/1e+7;
	
	number_planets = 5;
	
	time_glob = 0;
	
		for (var i = 0; i < length_array; i++)
		{
			for (var j = 0; j < length_array; j++)
			{
				rx[i][j] = 0;
				ry[i][j] = 0;
				r[i][j] = 0;
				a[i][j] = 0;
			}
		}
		
		for (var i = 0; i < length_array; i++)
		{
				radius_planeta[i] = 0;
				plotnost_planeta[i] = 0;
				massa[i] = 0;
				Sx[i] = 0;
				Sy[i] = 0;
				Vx[i] = 0;
				Vy[i] = 0;
				ax[i] = 0;
				ay[i] = 0;
		}
		
for (var i = 0; i < number_planets; i++)
		{
				radius_planeta[i] = 6.371e+6;
				plotnost_planeta[i] = 5.51e+3;
				massa[i] = 5.9742e+24;
		}

Sx[0] = 100 * mash;    Sy[0] = 100 * mash;	

Sx[1] = 1000 * mash;   Sy[1] = 100 * mash;

Sx[2] = 100 * mash;    Sy[2] = 700 * mash;

Sx[3] = 1000 * mash;    Sy[3] = 700 * mash;

Sx[4] = 500 * mash;    Sy[4] = 500 * mash;	

 
d0.style.left = Sx[0]/mash + 'px';	d0.style.top = Sy[0]/mash + 'px';
	  
d1.style.left = Sx[1]/mash + 'px';	d1.style.top = Sy[1]/mash + 'px'; 
	  
d2.style.left = Sx[2]/mash + 'px';	d2.style.top = Sy[2]/mash + 'px';
	  
d3.style.left = Sx[3]/mash + 'px';	d3.style.top = Sy[3]/mash + 'px';
	  
d4.style.left = Sx[4]/mash + 'px';	d4.style.top = Sy[4]/mash + 'px';

animation()

document.myform.hour.value = 0;
document.myform.day.value = 0;
document.myform.month.value = 0;
document.myform.year.value = 0;

} 

function btnClick5()
 {
	var output = [], number_line = 0;
	
	output[number_line] = "<p align='center' style='color:#000; font-size:22px'> Вывод расчетов.</p>";
	number_line++;
	output[number_line] = "<p style='color:#000; font-size:20px'> Время эвалюции системы.</p>";
	number_line++;
	output[number_line] = "<p style='font-size:20px;'> Лет: "+year+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Месяцов: "
	+month+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Дней: "+day+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Часов: "+hour+"</p>";
	number_line++;
	for(var i=0; i < number_planets; i++ )
	{var j=i+1;
	if((massa[i] > 0) && (plotnost_planeta[i] > 0))
	{
	output[number_line] = "<p style='font-size:20px'>Небесное тело № " + j + "<br>"+
	" Текущие координаты: <br> x = " + Sx[i] + " м; y =  " + Sy[i]+ " м; <br>"+ "Масса = " 
	 +massa[i]+" кг; <br>Плотность = "+plotnost_planeta[i]+"кг/м^3;"+ 
	 "<br> Действующие гравитационная сила: <br> F = "+F[i]+" Нютон.</p>"; 
	number_line++;
	}
	else
	{
	output[number_line] = "<p style='font-size:20px'>Небесное тело № " + j + 
	"<br> было поглащено и более не существует.</p>"; 
	number_line++;
	}
	
	}
	
		document.getElementById("window_model").innerHTML = output;

 }
 
 function btnClick6()
 {
var number_element = +myform.number_element.value-1;

if((number_element < number_planets) && (number_element >= 0))
	{
	if((massa[number_element] > 0) && (plotnost_planeta[number_element] > 0))
		{
			document.myform.x.value = Sx[number_element]/mash;
			document.myform.y.value = Sy[number_element]/mash;
			document.myform.m.value = massa[number_element];
			document.myform.p.value = plotnost_planeta[number_element];
			document.myform.vx.value = Vx[number_element];	
			document.myform.vy.value = Vy[number_element];
		}
	else
		{
			alert('Элемент был поглащен!!!!');
		}
	}
else
	{
	alert('Элемент не существует!!!!');
	}
}
 
function btnClick7()
 {
var number_element = +myform.number_element.value-1;

if((number_element < number_planets) && (number_element >= 0))
	{
	if((massa[number_element] > 0) && (plotnost_planeta[number_element] > 0))
		{
			Sx[number_element] = (+myform.x.value)*mash;
			Sy[number_element] = (+myform.y.value)*mash;
			massa[number_element] = +myform.m.value;
			plotnost_planeta[number_element] = +myform.p.value;
			Vx[number_element] = +myform.vx.value;	
			Vy[number_element] = +myform.vy.value;
		}
	else
		{
			alert('Элемент был поглащен!!!!');
		}
	}
else
	{
	alert('Элемент не существует!!!!');
	}
 }