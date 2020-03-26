import 'org.apache.hadoop.hbase.client.HTable'
import 'org.apache.hadoop.hbase.client.Put'
def put_many( table_name, row, column_values )
  table = HTable.new(@hbase.configuration, table_name)
  p = Put.new(row.to_s.to_java_bytes)
  column_values.each do |k,v|
    colfamily = k.split(':')
    p.add(colfamily.first.to_s.to_java_bytes, colfamily.last.to_s.to_java_bytes, v.to_s.to_java_bytes)
  end
  table.put(p)
end

# put_many 'wiki', 'Some title', { "text:" => "Some article text", "revision:author" => "jschmoe", "revision:comment" => "no comment" }
