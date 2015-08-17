#!/usr/bin/lua

--[[
ffstats
Copyright (c) 2015. Andreas Rutz. Published under MIT license.
]]

local sys = require('luci.sys')
local uci = require('luci.model.uci')
local util = require('luci.util')
local ltn12 = require('luci.ltn12')
local json = require('luci.json')
local fs = require('luci.fs')

function get_contact()
    local cursor = uci.cursor();
    local info = cursor.get_all('gluon-node-info')
    for _, v in pairs(info) do
        for subk, subv in pairs(v) do
            if (subk == '.type' and subv == 'owner') then
                return v['contact']
            end
        end
    end
end

function get_connected_clients(interface)
    local _, count = string.gsub(util.exec('iwinfo ' .. interface .. ' assoclist | grep "dBm"'), '\n', '')

    return count
end

function get_gateway()
    local sock = nixio.socket('unix', 'stream')
    local decoder = json.Decoder()
    sock:connect('/var/run/fastd.mesh_vpn.socket')

    ltn12.pump.all(ltn12.source.file(sock), decoder:sink())
    -- sock.close()

    local info = decoder:get()

    if info then
        local peers = info.peers

        for k, peer in pairs(peers) do
           if peer.connection then
               return peer.name
           end
        end
    end

    return nil
end

function get_gateway_domain(gateway)
    local info = fs.readfile('/tmp/fastd/fastd.mesh_vpn/peers%mesh_vpn_backbone/' .. gateway)

    if info then
        return string.match(info, 'remote \"([^|"]+)')
    end

    return nil
end

io.write('Content-Type: application/json\n\n')
io.write('{')
io.write('"hostname": "' .. sys.hostname() .. '",')
io.write('"uptime": ' .. sys.uptime() .. ',')
io.write('"contact": "' .. get_contact() .. '"' .. ',')
io.write('"clients": ' .. get_connected_clients('client0') .. ',')

local gateway = get_gateway()
if gateway then
    gateway = get_gateway_domain(gateway)
else
    gateway = 'not connected'
end
io.write('"gateway": "' .. gateway .. '"')

io.write('}')