
using Integrador;

var apiExample = new SimpleApiExample();
string url = "https://jsonplaceholder.typicode.com/posts/1";


var tasks = new Task<string>[10];

for (int i = 0; i < tasks.Length; i++)
{
    tasks[i] = apiExample.CallApiAsync(url);
}

var result = await Task.WhenAll(tasks);

Console.WriteLine($"Resultado da requisição: {result}");

#region [Bulkhead]
//using Integrador;

//var bulkheadExample = new BulkheadExample();
//string apiUrl = "https://jsonplaceholder.typicode.com/posts/1"; 

//var tasks = new Task<string>[10];

//for (int i = 0; i < tasks.Length; i++)
//{
//    tasks[i] = bulkheadExample.CallApiWithBulkheadAsync(apiUrl);
//}

//var results = await Task.WhenAll(tasks);

////foreach (var result in results)
////{
////    Console.WriteLine($"Resultado da requisição: {result.Substring(0, 100)}..."); 
////}

#endregion

Console.ReadLine();