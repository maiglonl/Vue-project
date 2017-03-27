<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application();

function getBills($sufix)
{
    $json = file_get_contents(__DIR__ . '/bills.json');
    $data = json_decode($json, true);
    return $data["bills$sufix"];
}

function findIndexById($id, $sufix)
{
    $bills = getBills($sufix);
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBills($bills, $sufix)
{
    $billsPay = getBills("Pay");
    $billsReceive = getBills("Receive");
    $data = ["billsPay" => $billsPay, "billsReceive" => $billsReceive];
    $data["bills$sufix"] = $bills;
    $json = json_encode($data);

    file_put_contents(__DIR__ . '/bills.json', $json);
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('api/billsPay', function () use ($app) {
    $bills = getBills("Pay");
    return $app->json($bills);
});

$app->get('api/billsPay/total', function () use ($app) {
    $bills = getBills("Pay");
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/billsPay/{id}', function ($id) use ($app) {
    $bills = getBills("Pay");
    $bill = $bills[findIndexById($id, "Pay")];
    return $app->json($bill);
});

$app->post('api/billsPay', function (Request $request) use ($app) {
    $bills = getBills("Pay");
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills, "Pay");
    return $app->json($data);
});

$app->put('api/billsPay/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills("Pay");
    $data = $request->request->all();
    $index = findIndexById($id, "Pay");
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills, "Pay");
    return $app->json($bills[$index]);
});

$app->delete('api/billsPay/{id}', function ($id) {
    $bills = getBills("Pay");
    $index = findIndexById($id, "Pay");
    array_splice($bills,$index,1);
    writeBills($bills, "Pay");
    return new Response("", 204);
});


$app->get('api/billsReceive', function () use ($app) {
    $bills = getBills("Receive");
    return $app->json($bills);
});

$app->get('api/billsReceive/total', function () use ($app) {
    $bills = getBills("Receive");
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/billsReceive/{id}', function ($id) use ($app) {
    $bills = getBills("Receive");
    $bill = $bills[findIndexById($id, "Receive")];
    return $app->json($bill);
});

$app->post('api/billsReceive', function (Request $request) use ($app) {
    $bills = getBills("Receive");
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills, "Receive");
    return $app->json($data);
});

$app->put('api/billsReceive/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills("Receive");
    $data = $request->request->all();
    $index = findIndexById($id, "Receive");
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills, "Receive");
    return $app->json($bills[$index]);
});

$app->delete('api/billsReceive/{id}', function ($id) {
    $bills = getBills("Receive");
    $index = findIndexById($id, "Receive");
    array_splice($bills,$index,1);
    writeBills($bills, "Receive");
    return new Response("", 204);
});


$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();