class ScrambleSerializer < BaseSerializer
  def initialize(@scramble : Scramble)
  end

  def render
    {
      id:         @scramble.id,
      name:       @scramble.name,
      scramblers: @scramble.scramblers.map { |s| {id: s.id, name: s.name} }.to_a,
    }
  end
end
